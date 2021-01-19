const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");
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

router.delete('/:id', isLoggedIn, (req, res)=>{
    const { id } = req.params;
    if ( !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    User.findByIdAndRemove(id)
      .then(() => {
          req.session.destroy();
        res
          .status(202)  
          .send(`Document ${id} was removed successfully.`);
      })
      .catch( err => {
        res.status(500).json(err);
      })
});



module.exports = router;