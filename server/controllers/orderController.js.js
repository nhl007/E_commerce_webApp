const Order = require('../model/order');
const Product = require('../model/product');

const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderedItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderedItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.send({ success: 'true', order }).status(200);
});

//!get a single order

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate(
    'user',
    'name email'
  );
  if (!order)
    return next(
      new errorHandler('No order found with id ' + req.params.orderId)
    );
  res.send({ success: 'true', order });
});

//!get logged in user's orders

const getLogedUserOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  if (!order) {
    return next(new errorHandler('No order found with id ' + req.body.orderId));
  }

  res.json({ success: 'true', totalOrders: order.length, order }).status(200);
});

//!admin get all orders of an user orders

const adminAllOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();

  if (!order) {
    return next(new errorHandler('No order found'));
  }

  let totalAmmount = 0;
  order.forEach((product) => {
    totalAmmount += product.totalPrice;
  });
  res.send({
    success: 'true',
    totalOrders: order.length,
    totalAmmount: totalAmmount,
    order,
  });
});

//! update stock and delivary info

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

const adminOrdersUpdate = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === 'delivered') {
    return next(new errorHandler('You have already delivered this order', 400));
  }

  order.orderedItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.send({
    success: 'true',
    totalOrders: order.length,
    order,
  });
});

const deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new errorHandler('No order found'));

  await order.remove();
  res.send({
    success: 'true',
    message: 'Successfully deleted the order',
    totalOrders: order.length,
  });
});

module.exports = {
  newOrder,
  getLogedUserOrders,
  getSingleOrder,
  adminAllOrders,
  adminOrdersUpdate,
  deleteOrders,
};
