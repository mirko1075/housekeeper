const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user.model");

/* HELPER FUNCTIONS */
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

/* ROUTES  */
module.exports = router;
