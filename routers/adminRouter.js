const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = require('express').Router();
// router.use(authController.isLoggined);
router.get('/admin/book', authController.authorization('admin'), adminController.getManagerBook);
router.get('/admin/user', authController.authorization('admin'), adminController.getManagerUser);
router.get('/admin/order', authController.authorization('admin'), adminController.getManagerOrder);
router.get('/admin/profile', authController.authorization('admin'), adminController.getProfile);

module.exports = router;
