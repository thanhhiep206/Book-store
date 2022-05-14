const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
router.get('/', authController.isLoggined, viewController.getIndex);
router.get('/account', authController.isLoggined, viewController.getMe);
router.get('/cart', authController.isLoggined, viewController.getCart);
//nest route
router.get('/book/:slug', authController.isLoggined, viewController.getReview);
// router.get('/*', viewController.getError);
router.get('/cartgory/:cartgory', authController.isLoggined, viewController.getCartgory);
router.get('/search', searchController.search);
module.exports = router;
