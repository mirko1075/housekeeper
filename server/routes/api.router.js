const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const ReviewsRelational = require("../models/reviewsRelational.model");

/* HELPER FUNCTIONS */
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

/* ROUTES  */
module.exports = router;
