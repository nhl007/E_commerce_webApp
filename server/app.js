//!imports package
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//! import routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const orders = require('./routes/order');

//! import middleware
const ErrorHandler = require('./middleware/errors');

//! app
const app = express();

//!middleware

const whitelist = process.env.WHITELIST.split(',');

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // `!origin` allows server-to-server requests (ie, localhost requests)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//!routes
app.get('/', (req, res) => {
  res.send({
    projectName: 'E_Commerce_RestAPI',
    Owner: 'Asif Nihal',
    description: 'Powering the E-com FrontEnt',
  });
});

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', orders);

//!error handler middleware

app.use(ErrorHandler);

module.exports = app;
