const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = require('express').Router();

router.get('/checkout-session/:bookId', authController.isLoggined, orderController.getCheckoutSession);
router.post('/cod/:bookId', authController.isLoggined, orderController.createOrderCod);
router
  .route('/')
  .get(orderController.getAllOrder)
  .post(orderController.createOneOrder)
  .delete(orderController.deleteAllOrder);
//id
router
  .route('/:id')
  .patch(orderController.updateOneOrder)
  .delete(orderController.deleteOneOrder)
  .get(orderController.getOneOrder);
module.exports = router;
