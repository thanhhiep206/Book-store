const cartgoryController = require('../controllers/cartgoryController');
const router = require('express').Router();
//ALl
router
  .route('/')
  .get(cartgoryController.getAllCartgory)
  .post(cartgoryController.createOneCartgory)
  .delete(cartgoryController.deleteAllCartgory);
//One
router
  .route('/:id')
  .get(cartgoryController.getOneCartgory)
  .patch(cartgoryController.updateOneCartgory)
  .delete(cartgoryController.deleteOneCartgory);

module.exports = router;
