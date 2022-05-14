const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/updateMe', authController.isLoggined, authController.authorization('user'), userController.updateMe);
//crud user
router.use(authController.authorization('admin'));
//all
router.route('/').get(userController.getAllUser).post(userController.createOneUser).delete(userController.deleteAllUser);
//id
router.route('/:id').patch(userController.updateOneUser).delete(userController.deleteOneUser).get(userController.getOneUser);
module.exports = router;
