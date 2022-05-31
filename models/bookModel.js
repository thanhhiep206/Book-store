const mongoose = require('mongoose');
const slugify = require('slugify');
const bookSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    cartgory: {
      required: true,
      type: String,
    },
    slug: String,
    price: {
      required: true,
      type: Number,
    },
    percentSale: {
      required: true,
      type: Number,
    },
    priceafterSale: Number,
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
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReviewBook',
    },
  },
  { timestamps: true },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
// virtuals property
//not working
// bookSchema.virtual('reviews', {
//   ref: 'ReviewBook',
//   foreignField: 'book',
//   localField: '_id',
// });
//populate
// bookSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'reviews',
//     select: '-__v',
//   });
//   next();
// });
bookSchema.pre('save', function (next) {
  const percent = 100;
  this.slug = slugify(this.name, { lower: true });
  this.priceafterSale = this.price - (this.price * Math.abs(this.percentSale)) / percent;
  next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
