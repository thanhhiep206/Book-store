const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post(
  '/updateMe',
  authController.isLoggined,
  userController.resizeUserPhoto,
  userController.uploadUserPhoto,
  userController.updateMe
);
router.post(
  '/updatePasswordMe',
  authController.isLoggined,
  authController.authorization('user', 'admin'),
  authController.updatePasswordMe
);
//crud user
// router.use(authController.authorization('admin'));
//all
router.route('/').get(userController.getAllUser).post(userController.createOneUser).delete(userController.deleteAllUser);
//id
router.route('/:id').patch(userController.updateOneUser).delete(userController.deleteOneUser).get(userController.getOneUser);

module.exports = router;
