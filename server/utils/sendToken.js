const sendToken = (user, res, statusCode) => {
  const token = user.getJwtToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
