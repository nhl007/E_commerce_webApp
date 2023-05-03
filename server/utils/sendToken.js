const sendToken = (user, res, statusCode) => {
  const token = user.getJwtToken();
  const sevenDay = 7 * 1000 * 60 * 60 * 24;
  const cookieOptions = {
    httpOnly: true,
    maxAge: sevenDay,
    sameSite: 'Strict',
  };
  res.cookie('token', token, cookieOptions);
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
