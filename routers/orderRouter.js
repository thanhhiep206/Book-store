const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const router = require('express').Router();

router.get('/checkout-session/:bookId', authController.isLoggined, orderController.getCheckoutSession);
module.exports = router;
