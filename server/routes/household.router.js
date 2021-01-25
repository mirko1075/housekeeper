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

router.get("/:id", isLoggedIn, (req, res, next) => {
  const {id} = req.params;
  console.log('id', id)
  Household.findById(id).populate("admin").populate("members")
    .then((household) => res.status(201).json(household))
    .catch((err) => {
      next(createError(err));
    });
})

router.post("/", isLoggedIn, (req, res, next) => {
  const { title } = req.body;
  const admin = req.session.currentUser._id;
  const members = [admin];

  Household.create({ title, admin, members})
    .then((newHouse) => {
      const houseID = newHouse._id;
      const adminID = newHouse.admin;
      User.findByIdAndUpdate(adminID, { household: houseID, admin: true })
        .then((updatedUser) => {
          req.session.currentUser.household = updatedUser.household;
          res.status(201).json(newHouse);
        })
        .catch((err) => {
          next(createError(err));
        });
    })
    .catch((err) => {
      next(createError(err));
    });
});

router.delete("/:houseId", isLoggedIn, (req, res, next) => {
  const { houseId } = req.params;
  const adminID = req.session.currentUser._id;

  Household.findByIdAndDelete(houseId)
    .then(() => {
      User.findByIdAndUpdate(adminID, {
        $unset: { household: "" },
        admin: false,
      })
        .then((updatedUser) => {
          req.session.currentUser.household = "";
          res.status(201).json(updatedUser);
        })
        .catch((err) => {
          next(createError(err));
        });
    })
    .catch((err) => {
      next(createError(err));
    });
});

router.put("/:houseId", isLoggedIn, (req, res, next) => {
  const { houseId } = req.params;
  const { title } = req.body;

  Household.findByIdAndUpdate(houseId, { title }, { new: true })
    .then((modifiedHouse) => {
      res.status(200).json(modifiedHouse);
    })
    .catch((err) => {
      next(createError(err));
    });
});

module.exports = router;
