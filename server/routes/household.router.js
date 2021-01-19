const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Household = require("../models/household.model");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");






module.exports = router;
