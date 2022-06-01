const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
//getAdmin dashboard if req.user.role =='admin'

exports.getManagerBook = catchAsync(async (req, res) => {
  const items = await Book.find();
  res.status(200).render('admin/book', {
    breadcrumb: 'Book',
    items,
  });
});
exports.getManagerUser = catchAsync(async (req, res) => {
  const items = await User.find({ role: { $ne: 'admin' } });
  res.status(200).render('admin/user', {
    breadcrumb: 'User',
    items,
  });
});
exports.getManagerOrder = catchAsync(async (req, res) => {
  const item = await Order.find();
  const items = item.filter((x) => x.user === null);
  res.status(200).render('admin/order', {
    breadcrumb: 'Order',
    items,
  });
});
exports.getProfile = (req, res) => {
  res.status(200).render('admin/profile', {
    breadcrumb: 'Profile',
    user: req.user,
  });
};
