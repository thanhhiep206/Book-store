const factory = require('./refactoryController');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.addtoCart = catchAsync(async (req, res, next) => {
  const booktocart = new Cart({
    user: req.user.id,
    book: req.params.bookId,
  });

  await booktocart.save();

  res.redirect('/cart');
});
exports.deleteCart = catchAsync(async (req, res, next) => {
  const bookDelete = await Cart.findOneAndDelete({ user: req.user.id, book: req.params.bookId });
  res.redirect('/cart');
});
