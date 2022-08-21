const reviewController = require('../controllers/reviewController');
const router = require('express').Router();
//ALl

router.route('/:id').get(reviewController.getOneReview);

module.exports = router;
