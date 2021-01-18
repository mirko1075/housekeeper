const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user.model");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

// POST '/auth/signup'
router.post("/signup", isNotLoggedIn, validationLogin, (req, res, next) => {
  console.log("Signup");
  const {
    username,
    firstName,
    lastName,
    image,
    admin,
    email,
    password,
  } = req.body;
  //console.log("SIGNING UP FROM AUTH.ROUTER");
  User.findOne({ email })
    .then((foundUser) => {
      //console.log("foundUser :>> ", foundUser);
      if (foundUser) {
        // If email is already taken, then return error response

        return next(createError(400)); // Bad Request
      } else {
        // If email is available, go and create a new user
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        User.create({
          email,
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
          .then((createdUser) => {
            // set the `req.session.currentUser` using newly created user object, to trigger creation of the session and cookie
            createdUser.password = "*";
            req.session.currentUser = createdUser; // automatically logs in the user by setting the session/cookie

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

// POST '/auth/login'
router.post("/login", isNotLoggedIn, validationLogin, (req, res, next) => {
  console.log("Login");
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // If user with that email can't be found, respond with an error
        return next(createError(404)); // Not Found
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password); //  true/false

      if (passwordIsValid) {
        // set the `req.session.currentUser`, to trigger creation of the session
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

// POST '/auth/login'
router.get("/user", isLoggedIn, (req, res, next) => {
  console.log("Get User");
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        // If user with that email can't be found, respond with an error
        return next(createError(404)); // Not Found
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// GET '/auth/logout'
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

// GET '/auth/me'
router.get("/me", isLoggedIn, (req, res, next) => {
  //console.log("Me :>> ");
  currentUserSessionData = req.session.currentUser;

  res.status(200).json(currentUserSessionData);
});

// POST '/auth/editProfile'
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
  //console.log("req.body :>> ", req.body);
  const userId = req.session.currentUser._id;
  //console.log("userId :>> ", userId);
  User.findById(userId)
    .then((user) => {
      //console.log("user :>> ", user);
      if (!user) {
        // If user with that email can't be found, respond with an error
        return next(createError(404)); // Not Found
      }
      //console.log("password, user.password :>> ", password, user.password);
      const passwordIsValid = bcrypt.compareSync(password, user.password); //  true/false
      //console.log("passwordIsValid :>> ", passwordIsValid);
      if (passwordIsValid) {
        // set the `req.session.currentUser`, to trigger creation of the session
        // res.status(200).json(user);
        // If email is available, go and create a new user
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

// GET '/auth/cart'
router.get("/cart", isLoggedIn, (req, res, next) => {
  console.log("Get Cart> ");
  if (req.session.currentUser) {
    const userId = req.session.currentUser._id;
    // console.log("currentUserSessionData :>> ", currentUserSessionData);
    const pr = User.findById(userId)
      .populate({
        path: "cart",
        populate: {
          path: "productId",
        },
      })
      .then((userFound) => {
        const cart = userFound.cart;
        console.log("Retriving cart :>> ", cart);
        res.status(200).json(cart);
      })
      .catch((err) => {
        console.log("Error retriving user cart :>> ", err);
      });
  } else {
    es.status(200).json({});
  }
});

// POST '/auth/cart'
router.post("/cart", isLoggedIn, (req, res, next) => {
  const cart = req.body;
  //console.log("req.body from route :>> ", req.body);
  //console.log("cart from route :>> ", cart);
  // const cartItem = { id: cart.id, amount: cart.amount };
  // const cartItem = cart;
  // //console.log("cartItem :>> ", cartItem);
  const currentUserSessionData = req.session.currentUser._id;

  // const pr = User.findOneAndUpdate(
  //   { _id: currentUserSessionData },
  //   { $set: { cart: cartItem } }
  // )

  const pr = User.findByIdAndUpdate(currentUserSessionData, {
    $set: {
      cart: cart,
    },
  })
    .then((userUpdated) => {
      //console.log("userUpdated :>> ", userUpdated.cart);
      res.status(200).json(userUpdated);
    })
    .catch((err) => {
      //console.log("err", err);
    });
});

// POST '/auth/favourites'
router.post("/favourites", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser;
  const { productId, favourite } = req.body;
  console.log("Favourites modifying  :>> ", productId, favourite, req.body);
  const pr = User.findByIdAndUpdate(userId, {
    $set: {
      favourites: favourite,
    },
  })
    .then((userUpdated) => {
      console.log("userUpdated :>> ", userUpdated);
      res.status(200).json(userUpdated);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

module.exports = router;
