const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = require('express').Router();
// router.use(authController.isLoggined);
// router.use(authController.authorization('admin'));
router.get('/admin/book', adminController.getManagerBook);
router.get('/admin/user', adminController.getManagerUser);
router.get('/admin/order', adminController.getManagerOrder);
router.get('/admin/profile', adminController.getProfile);

module.exports = router;
