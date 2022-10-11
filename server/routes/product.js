const router = require('express').Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

const { protectRoutes, authorizeRole } = require('../middleware/auth.js');

router.route('/products').get(protectRoutes, getProducts);
router.route('/product/:id').get(protectRoutes, getSingleProduct);

//!admin access only
router
  .route('/admin/product/new')
  .post(protectRoutes, authorizeRole('admin'), newProduct);
router
  .route('/admin/product/:id')
  .put(protectRoutes, authorizeRole('admin'), updateProduct)
  .delete(protectRoutes, authorizeRole('admin'), deleteProduct);

module.exports = router;
