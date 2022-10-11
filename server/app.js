//!imports package
const express = require('express');
const cors = require('cors');
const cookie_parser = require('cookie-parser');

//! import rooutes
const products = require('./routes/product');
const auth = require('./routes/auth');

//! import middlewares
const ErrorHandler = require('./middleware/errors');

//! app
const app = express();

//!middlewares
app.use(cors());
app.use(express.json());
app.use(cookie_parser());

//!routes
app.get('/', (req, res) => {
  res.send('hello from simple server :)');
});

app.use('/api/v1', products);
app.use('/api/v1', auth);

//!error handler middlewares

app.use(ErrorHandler);

module.exports = app;
