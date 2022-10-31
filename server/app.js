//!imports package
const express = require('express');
const cors = require('cors');
const cookie_parser = require('cookie-parser');

//! import rooutes
const products = require('./routes/product');
const auth = require('./routes/auth');
const orders = require('./routes/order');

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
  res.send({
    projectName: 'E_Commerce_',
    Author: 'Nihal',
    message: 'hello from the server :',
  });
});

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', orders);

//!error handler middlewares

app.use(ErrorHandler);

module.exports = app;
