const router = require('express').Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');
router.use(authController.isLoggined);
// router.get('/admin/dashboard', viewController.getAdmin);
// router.get('/admin/dashboard/add_user', viewController.getadduser);
// router.get('/admin/dashboard/update_user', viewController.getupdateUser);
router.get('/', viewController.getIndex);
router.get('/account', viewController.getMe);
router.get('/cart', viewController.getCart);
//nest route
router.get('/book/:slug', viewController.getReview);
// router.get('/*', viewController.getError);
router.get('/cartgory/:cartgory', viewController.getCartgory);
router.get('/search', searchController.search);
module.exports = router;
