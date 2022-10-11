const router = require('express').Router();
const {
  registerUser,
  signInUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  updateUserPassword,
  getAllUsers,
  getUserDetails,
  updateUserProfile,
  deleteUser,
} = require('../controllers/authController');
const { protectRoutes, authorizeRole } = require('../middleware/auth');

router.route('/register').post(registerUser);

router.route('/signin').post(signInUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgetPassword);
router.route('/reset/:token').put(resetPassword);

//!profiles
router.route('/me').get(protectRoutes, getUserProfile);
router.route('/me/update').put(protectRoutes, updateProfile);
router.route('/password/update').put(protectRoutes, updateUserPassword);

//!admin
router
  .route('/admin/users')
  .get(protectRoutes, authorizeRole('admin'), getAllUsers);
router
  .route('/admin/users/:id')
  .get(protectRoutes, authorizeRole('admin'), getUserDetails)
  .put(protectRoutes, authorizeRole('admin'), updateUserProfile)
  .delete(protectRoutes, authorizeRole('admin'), deleteUser);
module.exports = router;
