const Product = require('../model/product');

//! create a new Product
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  return res.status(201).json({ success: true, product });
};

//! get all products from database
exports.getProducts = async (req, res, next) => {
  // Product.find()
  //   .then((products) =>
  //     res.status(200).json({ success: true, count: products.length, products })
  //   )
  //   .catch((err) => next(err));

  const products = await Product.find();

  res.status(200).json({
    success: true,
    totalProducts: products.length,
    products,
  });
};

//! get a single product from database

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  return res.status(200).json({ success: true, product });
};

//! update a product with the specified id

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    product,
  });
};

//! delete a product with the specified id

exports.deleteProduct = async (req, res, next) => {
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
};
