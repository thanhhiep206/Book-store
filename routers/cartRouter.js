const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const router = require('express').Router();
router.post('/:bookId', authController.isLoggined, cartController.addtoCart);
router.route('/').get(cartController.getAllCart).delete(cartController.deleteAllCart).post(cartController.createCart);
router.route('/:id').get(cartController.getOneCart).patch(cartController.updateCart).delete(cartController.deleteOneCart);

module.exports = router;
