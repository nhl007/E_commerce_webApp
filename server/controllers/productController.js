const Product = require('../model/product');

const ErrorHandler = require('../utils/errorHandler');
const apiFeatures = require('../utils/apiFeatures');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//! create a new Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
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
  const prouctPerPage = 2;

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
