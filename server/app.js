//!imports package
const express = require('express');
const cors = require('cors');

//! import rooutes
const products = require('./routes/product');

//! app
const app = express();

//!middlewares
app.use(cors());
app.use(express.json());

//!routes
app.get('/', (req, res) => {
  res.send('hello from simple server :)');
});

app.use('/api/v1', products);

module.exports = app;
