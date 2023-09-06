const sendToken = (user, res, statusCode) => {
  const token = user.getJwtToken();
  const sevenDay = 7 * 1000 * 60 * 60 * 24;

  let cookieOptions = {
    httpOnly: true,
    maxAge: sevenDay,
    sameSite: 'Strict',
  };

  if (process.env.NODE_ENV === 'PRODUCTION') {
    cookieOptions = {
      httpOnly: true,
      maxAge: sevenDay,
      sameSite: 'None',
      secure: true,
    };
  }

  res.cookie('token', token, cookieOptions);

  user.set('password', undefined);
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
