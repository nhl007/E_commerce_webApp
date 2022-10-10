const User = require('../model/users');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return next(new errorHandler('Please enter all the required fields', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, res, 201);
});

const signInUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler('Please enter all the required fields', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new errorHandler('Please input correct password', 401));
  }

  const isUser = await user.comparePassword(password);

  if (!isUser) {
    return next(new errorHandler('Please input correct password', 401));
  }

  //   const token = user.getJwtToken();

  //   res.status(200).json({
  //     success: true,
  //     token,
  //   });
  sendToken(user, res, 201);
});

module.exports = {
  registerUser,
  signInUser,
};
