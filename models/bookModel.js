const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    slug: String,
    price: {
      required: true,
      type: Number,
    },
    percentSale: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    img: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
