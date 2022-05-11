const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
router.get('/', authController.isLoggined, viewController.getIndex);
router.get('/account', authController.isLoggined, viewController.getMe);
router.get('/cart', authController.isLoggined, viewController.getCart);
//nest route
router.get('/book/:slug', authController.isLoggined, viewController.getReview);
// router.get('/*', viewController.getError);
router.get('/:cartgory', authController.isLoggined, viewController.getCartgory);
module.exports = router;
