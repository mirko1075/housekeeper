const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Household = require("../models/household.model");
const User = require("../models/user.model");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

router.post("/", isLoggedIn, (req, res, next) => {
    const { title } = req.body;
    const admin = req.session.currentUser._id;

    Household.create({title, admin})
    .then((newHouse) => {
        const houseID = newHouse._id;
        const adminID = newHouse.admin;
        User.findByIdAndUpdate(adminID, {household: houseID})
        .then(updatedUser => {
            req.session.currentUser.household = updatedUser.household; 
            res
            .status(201) 
            .json(newHouse); 
        })
        .catch((err) => {
            next(createError(err)); 
        });
    })
    .catch((err) => {
    next(createError(err));
    });
});




module.exports = router;
