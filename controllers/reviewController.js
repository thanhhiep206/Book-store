const factory = require('./refactoryController');
const ReviewBook = require('../models/reviewBookModel');

exports.getOneReview = factory.getOne(ReviewBook);
