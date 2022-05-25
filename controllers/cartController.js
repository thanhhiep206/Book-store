const factory = require('./refactoryController');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.addtoCart = catchAsync(async (req, res, next) => {
  const booktocart = new Cart({
    user: req.user.id,
    book: req.params.bookId,
  });
  console.log(booktocart);
  await booktocart.save();

  res.status(201).json({
    status: 'success',
    booktocart,
  });
});

exports.createCart = factory.createOne(Cart);

exports.updateCart = factory.updateOne(Cart);

exports.deleteOneCart = factory.deleteOne(Cart);
exports.deleteAllCart = factory.deleteAll(Cart);

exports.getAllCart = factory.getAll(Cart);

exports.getOneCart = factory.getOne(Cart);
