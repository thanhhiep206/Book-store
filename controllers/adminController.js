const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
//getAdmin dashboard if req.user.role =='admin'
exports.getDashboard = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'admin') {
      res.status(200).render('admin/index', {
        breadcrumb: 'Dashboard',
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
exports.getManagerBook = catchAsync(async (req, res) => {
  const allBook = await Book.find();
  res.status(200).render('admin/book', {
    breadcrumb: 'Book',
    allBook,
  });
});
exports.getManagerUser = catchAsync(async (req, res) => {
  const allUser = await User.find({ role: { $ne: 'admin' } });
  res.status(200).render('admin/user', {
    breadcrumb: 'User',
    allUser,
  });
});
exports.getManagerOrder = (req, res) => {
  res.status(200).render('admin/order', {
    breadcrumb: 'Order',
  });
};
exports.getProfile = (req, res) => {
  res.status(200).render('admin/profile', {
    breadcrumb: 'Profile',
  });
};
