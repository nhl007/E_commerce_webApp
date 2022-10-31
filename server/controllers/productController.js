const Product = require('../model/product');

const ErrorHandler = require('../utils/errorHandler');
const apiFeatures = require('../utils/apiFeatures');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//! create a new Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  return res.status(201).json({ success: true, product });
});

//! get all products from database
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  // Product.find()
  //   .then((products) =>
  //     res.status(200).json({ success: true, count: products.length, products })
  //   )
  //   .catch((err) => next(err));
  const prouctPerPage = 10;

  const feature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(prouctPerPage);

  const products = await feature.query;

  res.status(200).json({
    success: true,
    totalProducts: products.length,
    products,
  });
});
//! get a single product from database

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  return res.status(200).json({ success: true, product });
});
//! update a product with the specified id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    product,
  });
});

//! delete a product with the specified id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById({ _id: req.params.id });

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    product,
  });
});

//! product review

exports.productReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    name: req.user.name,
    user: req.user.id,
    rating: Number(rating),
    comments: comment,
  };
  const product = await Product.findById(productId);
  console.log(product);
  const isReviewd = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comments = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => {
      item.rating + acc, 0;
    }) / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Product review submitted successfully.',
  });
});

//!get all  reviews of a product

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//!get all  reviews of a product

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() === req.query.id.toString()
  );

  const numofReviews = reviews.length;
  console.log(reviews.length);
  const ratings =
    product.reviews.reduce((acc, item) => {
      item.rating + acc, 0;
    }) /
    (reviews.length === 0)
      ? '1'
      : reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  });
});
