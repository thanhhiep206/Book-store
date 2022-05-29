const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
//render home
exports.getIndex = catchAsync(async (req, res, next) => {
  const bookbestSale = await Book.find({ percentSale: { $gte: 35 } });

  const bookProgram = await Book.find({ cartgory: 'laptrinh' });
  const books = await Book.find({ percentSale: { $gte: 45 } });

  res.status(200).render('index', {
    title: 'LoveBook store for everyone',
    bookbestSale,
    bookProgram,
    books,
    user: req.user,
    style: 'index',
  });
});
//render profile user
exports.getMe = catchAsync(async (req, res) => {
  const orderlist = await Order.find({ user: req.user.id });
  console.log(orderlist);
  res.status(200).render('account', {
    title: 'Account Settings',
    user: req.user,
    orderlist,
    style: 'account',
  });
});
//render cart page
exports.getCart = catchAsync(async (req, res) => {
  const bookInCart = await Cart.find({ user: req.user.id }); //return array
  const bookInfo = bookInCart.map((x) => x.book);
  res.status(200).render('cart', {
    title: 'Your cart',
    user: req.user,
    style: 'cart',
    bookInfo,
  });
});
//get 404 all router
exports.getError = (req, res) => {
  res.status(404).render('error', {
    title: 'Not found router page',
    user: null,
    style: 'cart',
  });
};
// render review foreach book
exports.getReview = catchAsync(async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug }).populate('reviews');
  console.log(book.id);
  // book similar not equal above book
  const bookSimilar = await Book.find({ cartgory: book.cartgory, slug: { $ne: req.params.slug } }).limit(5);

  const reviewOfoneBook = book.reviews;
  res.status(404).render('review', {
    title: 'Love book',
    user: req.user,
    book,
    bookSimilar,
    reviewOfoneBook,
    style: 'product',
  });
});

//render each cartgory

exports.getCartgory = catchAsync(async (req, res) => {
  let books;

  books = await Book.find({ cartgory: req.params.cartgory });
  res.status(404).render('cartgory', {
    title: 'Danh mục sách',
    books,
    user: req.user,
    style: 'product',
  });
});
