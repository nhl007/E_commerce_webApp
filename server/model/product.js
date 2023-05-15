const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name can not exceed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [5, 'Product price can not exceed 5 digits'],
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      // public_id: {
      //   type: String,
      //   required: [true, 'Please enter product image'],
      // },
      url: {
        type: String,
        required: [true, 'Please enter product image url'],
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please select product category'],
    enum: {
      values: [
        'Electronics',
        'Camera',
        'Video',
        'Audio',
        'Laptop',
        'Desktop',
        'Mobile',
        'Headphone',
        'Books',
        'Clothing',
        'Beauty/Healthcare',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: {
        type: String,
        required: 'Please select product category',
      },
    },
  },
  seller: {
    type: String,
    required: [true, 'Please select product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock number'],
    min: 0,
    maxLength: [5, 'Stock number can not exceed 5 characters'],
    default: 0,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: [true, 'Please enter product review name'],
      },
      rating: {
        type: Number,
        required: [true, 'Please enter product review rating'],
      },

      comments: {
        type: String,
        required: [true, 'Please enter product review comments'],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Product', productSchema);
