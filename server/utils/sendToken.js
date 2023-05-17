const sendToken = (user, res, statusCode) => {
  const token = user.getJwtToken();
  const sevenDay = 7 * 1000 * 60 * 60 * 24;

  if (process.env.NODE_ENV === 'PRODUCTION') {
    const cookieOptions = {
      httpOnly: true,
      maxAge: sevenDay,
      secure: true,
    };
    res.cookie('token', token, cookieOptions);
    res.status(statusCode).json({
      success: true,
      token,
      user,
    });
  } else {
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
  }
};

module.exports = sendToken;
