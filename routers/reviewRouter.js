const reviewController = require('../controllers/reviewController');
const router = require('express').Router();
//ALl
router
  .route()
  .get(reviewController.getAllReview)
  .post(reviewController.createOneReview)
  .delete(reviewController.deleteAllReview);
//One
router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateOneReview)
  .delete(reviewController.deleteOneReview);
