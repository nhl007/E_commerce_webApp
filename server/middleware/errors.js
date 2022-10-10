const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Enternal server error';

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

    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
