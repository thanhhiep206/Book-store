const mongoose = require('mongoose');

const reviewBookSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    publishDate: {
      type: String,
      required: true,
    },
    sizeWidth: Number,
    sizeHeight: Number,
    chapter: Number,
    coverImage: {
      type: String,
      default: 'Bìa mềm',
    },
    pageNumber: Number,
    weight: Number,
    introduction: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewBookSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'book',
//     select: '-__v',
//   });
//   next();
// });
const reviewBook = mongoose.model('ReviewBook', reviewBookSchema);
module.exports = reviewBook;
