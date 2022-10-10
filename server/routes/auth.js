const router = require('express').Router();
const { registerUser, signInUser } = require('../controllers/authController');

router.route('/register').post(registerUser);

router.route('/sign-in').post(signInUser);

module.exports = router;
