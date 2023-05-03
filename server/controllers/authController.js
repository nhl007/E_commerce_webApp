const User = require('../model/users');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail');

const Crypto = require('crypto');
const { info } = require('console');

//! register user
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

//! sign in users

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
  sendToken(user, res, 200);
});

//! logout users

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'logged out successfully' });
});

//! forget password
const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler('User not found', 404));
  }
  const resetToken = user.passwordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.headers.host}/api/v1/reset/${resetToken}`;

  const message = `Your password reset url is: ${resetUrl}`;

  try {
    sendEmail({
      email: req.body.email,
      sub: 'Nihal.Co website password Recovery',
      message,
    });
    res.status(200).json({
      success: true,
      message: 'Please check your email for further instructions',
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(error.message, 500));
  }
});

//! reset user password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = Crypto.Hash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorHandler('No such user found or token has expired', 404)
    );
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new errorHandler('Passwords do not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, res, 201);
});

//! get user profile

const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new errorHandler('No user profile found !', 404));
  }
  res.status(200).send({ success: true, user });
});

//! update user profile

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).send({ success: true, user });
});

//! get user profile

const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    return next(new errorHandler('The password doesnt match !', 404));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, res, 201);
});

//? Admin Routes

//! get all users

const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, totalUsers: users.length, users });
});

//! get user deatails

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new errorHandler(`No user profile found with id ${req.params.id} !`, 404)
    );
  }
  res.status(200).send({ success: true, user });
});

//! update user profile

const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    roles: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).send({ success: true, user });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new errorHandler(`No user profile found with id ${req.params.id} !`, 404)
    );
  }
  user.remove();
  res.status(200).send({
    success: true,
    message: `Successfully deleted ${user.name}`,
    user,
  });
});

module.exports = {
  registerUser,
  signInUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserProfile,
  deleteUser,
};
