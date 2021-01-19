const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user.model");

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLogin,
  } = require("../helpers/middlewares");

// router.get("/user", isLoggedIn, (req, res, next) => {
//     const userId = req.session.currentUser._id;
  
//     User.findById(userId)
//       .then((user) => {
//         if (!user) {
//           return next(createError(404)); // Not Found
//         }
//         res.status(200).json(user);
//       })
//       .catch((err) => {
//         next(createError(err));
//       });
//   });


router.put("/edit", isLoggedIn, (req, res, next) => {
    console.log("Edit Profile");
    const {username, image} = req.body;
    const userId = req.session.currentUser._id;
  
    User.findByIdAndUpdate(userId, {username, image}, {new: true})
    .then((modifiedUser) => {
        res
        .status(200) 
        .json(modifiedUser); 
    })
    .catch((err) => {
        next(createError(err)); 
    });
      
});



module.exports = router;