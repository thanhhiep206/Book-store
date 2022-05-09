const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
router.get('/', authController.isLoggined, viewController.getIndex);
router.get('/account', authController.isLoggined, viewController.getMe);
router.get('/cart', authController.isLoggined, viewController.getCart);
router.get('/*', viewController.getError);
module.exports = router;
