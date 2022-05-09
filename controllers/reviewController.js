const factory = require('./factory')
const ReviewBook = require('../models/reviewBookModel')

exports.getOneReview = factory.getOne(ReviewBook)
exports.getAllReview = factory.getAll(ReviewBook)
exports.createOneReview = factory.createOne(ReviewBook)
exports.deleteOneReview = factory.deleteOne(ReviewBook)
exports.deleteAllReview = factory.deleteAll(ReviewBook)
exports.updateOneReview = factory.updateOne(ReviewBook)