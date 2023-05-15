const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  sales: {
    type: Number,
    required: false,
    default: 0,
  },
  rank: {
    type: Number,
    required: false,
    default: 0,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

module.exports = mongoose.model('Ranking', rankingSchema);
