const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Enteral server error';

  if (process.env.NODE_ENV.trim() === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      errors: err,
      message: err.message,
      error_stack: err.stack,
    });
  }

  if (process.env.NODE_ENV.trim() === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    //! wrong mongoose object id error

    if (err.name === 'CastError') {
      const message = `Resource not found: ${error.path}`;
      error = new ErrorHandler(message, 400);
    }

    //! moongoose validation error handler

    if (err.name === 'ValidationError') {
      const message = [];
      Object.values(error.errors).map((msg) => {
        message.push(msg.message);
      });
      error = new ErrorHandler(message, 400);
    }

    //! Mongoose Duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)}`;

      error = new ErrorHandler(message, 400);
    }

    //! wrong jwt error
    if (err.name === 'JsonWebTokenError') {
      const message = 'Json Web Token is Invalid. Try again';
      error = new ErrorHandler(message, 400);
    }

    //! jwt expiration error
    if (err.name === 'TokenExpiredError') {
      const message = 'Sorry! The token has expired. Try again';
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
