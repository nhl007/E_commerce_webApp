const router = require('express').Router();

const {
  newOrder,
  getSingleOrder,
  getLogedUserOrders,
  adminAllOrders,
  adminOrdersUpdate,
  deleteOrders,
} = require('../controllers/orderController.js');

const { protectRoutes, authorizeRole } = require('../middleware/auth.js');

router.route('/order/new').post(protectRoutes, newOrder);
router.route('/order/:orderId').get(protectRoutes, getSingleOrder);
router.route('/orders/me').get(protectRoutes, getLogedUserOrders);

// //!admin access only
router
  .route('/admin/orders/')
  .get(protectRoutes, authorizeRole('admin'), adminAllOrders);
router
  .route('/admin/orders/:id')
  .put(protectRoutes, authorizeRole('admin'), adminOrdersUpdate)
  .delete(protectRoutes, authorizeRole('admin'), deleteOrders);
// router
//   .route('/admin/product/:id')
//   .put(protectRoutes, authorizeRole('admin'), updateProduct)
//   .delete(protectRoutes, authorizeRole('admin'), deleteProduct);

module.exports = router;
