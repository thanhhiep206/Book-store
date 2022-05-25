const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
cartSchema.pre(/^find/, function (next) {
  this.populate('user').populate('book');
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
