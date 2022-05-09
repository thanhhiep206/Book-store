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
    publisher: String,
    coverImage: {
      type: String,
      default: 'Bìa mềm',
    },
    pageNumber: Number,
    weight: Number,
  },
  {
    timestamps: true,
  }
);
const reviewBook = mongoose.model('ReviewBook', reviewBookSchema);
module.exports = reviewBook;
