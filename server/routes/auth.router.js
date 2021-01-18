const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user.model");


const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");


router.post("/signup", isNotLoggedIn, (req, res, next) => {
  console.log("Signup");
  const { username, email, password } = req.body;
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        return next(createError(400)); // Bad Request
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        User.create({
          username,
          email,
          password: encryptedPassword,
        })
          .then((createdUser) => {
            createdUser.password = "*";
            req.session.currentUser = createdUser; 

            res
              .status(201) // Created
              .json(createdUser); // res.send()
          })
          .catch((err) => {
            next(createError(err)); //  new Error( { message: err, statusCode: 500 } ) // Internal Server Error
          });
      }
    })
    .catch((err) => {
      next(createError(err));
    });
});


router.post("/login", isNotLoggedIn, validationLogin, (req, res, next) => {
  console.log("Login");
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(createError(404)); // Not Found
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password); //  true/false

      if (passwordIsValid) {
        user.password = "*";
        req.session.currentUser = user;

        res.status(200).json(user);
      } else {
        next(createError(401)); // Unathorized
      }
    })
    .catch((err) => {
      next(createError(err));
    });
});


router.get("/user", isLoggedIn, (req, res, next) => {
  console.log("Get User");
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(createError(404)); // Not Found
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      next(createError(err));
    });
});


router.get("/logout", isLoggedIn, (req, res, next) => {
  console.log("Logout");
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }

    res
      .status(204) //  No Content
      .send();
  });
});


router.get("/me", isLoggedIn, (req, res, next) => {
  console.log("Me :>> ");
  currentUserSessionData = req.session.currentUser;

  res.status(200).json(currentUserSessionData);
});


router.post("/editProfile", isLoggedIn, (req, res, next) => {
  console.log("Edit Profile");
  const {
    firstName,
    lastName,
    address,
    country,
    CP,
    city,
    state,
    phoneNumber,
    gender,
    birthDateDay,
    birthDateMonth,
    birthDateYear,
    password,
  } = req.body;
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(createError(404)); // Not Found
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password); 

      if (passwordIsValid) {
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        User.findByIdAndUpdate(userId, {
          password: encryptedPassword,
          firstName,
          lastName,
          address,
          country,
          CP,
          city,
          state,
          phoneNumber,
          gender,
          birthDateDay,
          birthDateMonth,
          birthDateYear,
        })
          .then((modifiedUser) => {
            res
              .status(200) // Modified
              .json(modifiedUser); // res.send()
          })
          .catch((err) => {
            next(createError(err)); //  new Error( { message: err, statusCode: 500 } ) // Internal Server Error
          });
      } else {
        next(createError(401)); // Unathorized
      }
    })
    .catch((err) => {
      next(createError(err));
    });
});

module.exports = router;
