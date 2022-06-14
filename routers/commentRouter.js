const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const router = require('express').Router();
router.post('/:bookId', authController.isLoggined, commentController.addComment);

module.exports = router;
