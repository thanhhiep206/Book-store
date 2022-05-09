const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const router = require('express').Router();

//all
router.get('/', bookController.getAllBook);
router.post('/', bookController.createBook);
router.delete('/', bookController.deleteAllBook);
//id
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.getAllBook);
router.get('/:id', bookController.getOneBook);

module.exports = router;
