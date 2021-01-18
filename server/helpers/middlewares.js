const createError = require("http-errors");

exports.isLoggedIn = (req, res, next) => {
  // Check if user request has a cookie/session.
  console.log("isLoggedIn", req.session.currentUser);
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = (req, res, next) => {
  // Check if the user request came without a cookie and isn't logged in
  console.log("isNotLoggedIn", req.session.currentUser);
  if (!req.session.currentUser) next();
  else next(createError(403)); // new Error({message: '', statusCode: 403})
};

exports.validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log("validationLogin", email, password);
  if (!email || !password) {
    next(createError(400));
  } else next();
};

// Above exporting is same as what we did before:
// exports = {
//   isLoggedIn,
//   isNotLoggedIn,
//   validationLogin,
// }
