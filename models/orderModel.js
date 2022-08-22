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
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
      pack: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
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
