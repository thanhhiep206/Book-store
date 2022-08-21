const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const router = require('express').Router();
//admin permission
router.use(authController.authorization('admin'));
//all
router.route('/').get(bookController.getAllBook).post(bookController.createBook);
//id
router.route('/:id').patch(bookController.updateBook).delete(bookController.deleteOneBook).get(bookController.getOneBook);

module.exports = router;
