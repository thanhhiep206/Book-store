const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const axios = require('axios');
const Book = require('../models/bookModel');
exports.getIndex = catchAsync(async (req, res, next) => {
  // const result = await axios({
  //   method: 'get',
  //   url: 'http://localhost:3000/api/v1/books',
  // });
  // const book = result.data.book;
  const books = await Book.find();
  res.status(200).render('index', {
    title: 'LoveBook store for everyone',
    books,
    user: req.user,
  });
});
exports.getMe = (req, res) => {
  res.status(200).render('account', {
    title: 'Account Settings',
    user: req.user,
  });
};
exports.getCart = (req, res) => {
  res.status(200).render('cart', {
    title: 'Your cart',
    user: req.user,
  });
};
//get 404 all router
exports.getError = (req, res) => {
  res.status(404).render('error', {
    title: 'Not found router page',
    user: null,
  });
};
