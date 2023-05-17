const Product = require('../model/product');
const Ranking = require('../model/ranking');

const ErrorHandler = require('../utils/errorHandler');
const apiFeatures = require('../utils/apiFeatures');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const productDetails = require('../SeedDB/createProduct');

//? test seeding db
exports.seedDbCreate = catchAsyncErrors(async (req, res, next) => {
  productDetails.forEach(async (p) => {
    p.user = req.user.id;
    const product = await Product.create(p);

    await Ranking.create({
      views: 0,
      sales: 0,
      product: product._id,
    });
  });

  return res.status(201).json({ success: true });
});

//! create a new Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  await Ranking.create({
    views: 0,
    sales: 0,
    product: product._id,
  });

  return res.status(201).json({ success: true, product });
});

//! get all products from database with search parameters
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const prouctPerPage = 10;

  const feature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(prouctPerPage);

  const products = await feature.query;

  if (req.query.admin) {
    const totalProd = await Product.countDocuments();
    return res.status(200).json({
      success: true,
      totalProducts: totalProd,
      products,
      currentPage: req.query.page,
      totalPages: Math.ceil(totalProd / 10),
    });
  }

  res.status(200).json({
    success: true,
    totalProducts: products.length,
    products,
  });
});

//!get all product except the ranked products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const rankedProducts = await Ranking.find({}, 'rank product')
    .sort({
      rank: -1,
    })
    .limit(10);

  const currPage = Number(req.query.page) || 1;
  const skip = 10 * (currPage - 1);

  const products = await Product.find({
    _id: { $nin: rankedProducts.map((p) => p.product) },
  })
    .skip(skip)
    .limit(10);

  const totalProducts = (await Product.countDocuments()) - 10;

  res.status(200).json({
    success: true,
    totalProducts: totalProducts,
    products,
    currentPage: currPage,
    totalPages: Math.ceil(totalProducts / 10),
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

  const rankingModel = await Ranking.findOne({ product: product._id });

  rankingModel.remove();

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
    reviews: product.reviews,
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
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numofReviews = reviews.length;

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
    reviews: product.reviews,
  });
});

//!update ranking of products

exports.rankProducts = catchAsyncErrors(async (req, res, next) => {
  const rank = await Ranking.findOne({ product: req.params.id });

  const rankBy = req.query.update;
  // console.log(rankBy, rankBy === 'views');

  let data = null;

  if (rankBy) {
    data = {
      sales: rank.sales + 1,
      rank: (rank.sales + 1) * 5 + rank.views,
    };
  } else {
    data = {
      views: rank.views + 1,
      rank: rank.sales * 5 + (rank.views + 1),
    };
  }

  await Ranking.findOneAndUpdate({ _id: rank._id }, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await Product.findOneAndUpdate(
    { _id: rank.product },
    { rank: data.rank },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Updated Successfully!',
  });
});

exports.getRankedProducts = catchAsyncErrors(async (req, res, next) => {
  const ranked = await Ranking.find({}, 'product rank')
    .sort({ rank: -1 })
    .limit(10);

  const products = await Product.find({
    _id: ranked.map((p) => p.product),
  }).sort({ rank: -1 });

  res.status(200).json({
    success: true,
    message: 'Success',
    products: products,
  });
});
