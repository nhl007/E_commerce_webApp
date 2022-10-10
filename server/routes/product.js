const router = require('express').Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

//!admin access only
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
