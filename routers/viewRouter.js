const router = require('express').Router();
const viewController = require('../controllers/viewController');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
router.use(authController.isLoggined);
//getdashboard Admin  middleware
router.get('/', orderController.createOrderCheckout, adminController.getDashboard, viewController.getIndex);
router.get('/account', viewController.getMe);
router.get('/cart', viewController.getCart);

router.get('/book/:slug', viewController.getReview);
// router.get('/*', viewController.getError);
router.get('/cartgory/:cartgory', viewController.getCartgory);
router.get('/forget', viewController.getResetPassword);
router.get('/search', searchController.search);
module.exports = router;
