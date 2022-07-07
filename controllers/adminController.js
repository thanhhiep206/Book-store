const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
//getAdmin dashboard if req.user.role =='admin'
exports.getDashboard = catchAsync(async (req, res, next) => {
  const order = await Order.find();
  const user = await User.find();
  //total money
  const totalMoney = order.map((x) => x.book.priceafterSale);
  const total = totalMoney.reduce(function (prev, cur) {
    return prev + cur;
  });
  if (req.user) {
    if (req.user.role == 'admin') {
      res.status(200).render('admin/index', {
        breadcrumb: 'Dashboard',
        total,
        order,
        user,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

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
  const items = await Order.find();
  //not find user has been deleted

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
