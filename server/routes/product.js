const router = require('express').Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  productReview,
  getAllReviews,
  deleteReview,
} = require('../controllers/productController.js');

const { protectRoutes, authorizeRole } = require('../middleware/auth.js');

router.route('/products').get(getProducts);
router.route('/product/:id').get(protectRoutes, getSingleProduct);
router.route('/product/review').post(protectRoutes, productReview);
router.route('/review').get(protectRoutes, getAllReviews);
router.route('/review').delete(protectRoutes, deleteReview);

//!admin access only
router
  .route('/admin/product/new')
  .post(protectRoutes, authorizeRole('admin'), newProduct);
router
  .route('/admin/product/:id')
  .put(protectRoutes, authorizeRole('admin'), updateProduct)
  .delete(protectRoutes, authorizeRole('admin'), deleteProduct);

module.exports = router;
