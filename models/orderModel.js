const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      required: [true, 'Booking must belong to a Tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User!'],
    },
    price: {
      type: Number,
      require: [true, 'Booking must have a price.'],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 1,
    },
    info: {
      fullname: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      pack: {
        type: String,
      },
      payment: {
        type: String,
      },
      note: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate('book');
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
