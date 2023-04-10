const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('./catchAsyncErrors');
const User = require('../model/users');
const ErrorHandler = require('../utils/errorHandler');

const protectRoutes = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler('You are not allowed to access this route', 404)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles))
      return next(
        new ErrorHandler(
          `Role (${req.user.roles}) does not have access to this route`
        )
      );
    next();
  };
};

module.exports = {
  protectRoutes,
  authorizeRole,
};
