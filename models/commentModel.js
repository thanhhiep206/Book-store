const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      require: [true, 'Booking must have a price.'],
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.pre(/^find/, function (next) {
  this.populate('book').populate('user');
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
