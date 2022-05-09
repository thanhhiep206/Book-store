const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const router = require('express').Router();

//all
router.route('/').get(bookController.getAllBook).post(bookController.createBook).delete(bookController.deleteAllBook);
//id
router.route('/:id').patch(bookController.updateBook).delete(bookController.getAllBook).get(bookController.getOneBook);

module.exports = router;
