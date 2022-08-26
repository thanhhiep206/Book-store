const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
//getAdmin dashboard if req.user.role =='admin'
exports.getDashboard = catchAsync(async (req, res, next) => {
  const user = await User.find();
  //query in  money
  let startDate = new Date(2022, new Date().getMonth());
  let endDate = new Date(2022, new Date().getMonth() + 1);
  let startDateYear = new Date(new Date().getFullYear() - 1, 12);
  let endDateYear = new Date(new Date().getFullYear(), 12);
  const orderInMonth = await Order.find({
    $and: [{ createdAt: { $gt: startDate } }, { createdAt: { $lt: endDate } }],
  });
  const orderInYear = await Order.find({
    $and: [{ createdAt: { $gt: startDateYear } }, { createdAt: { $lt: endDateYear } }],
  });
  const totalMoney = orderInMonth.map((x) => x.book.priceafterSale);
  const totalYear = orderInYear.map((x) => x.book.priceafterSale);
  let totalInMonth = 0;
  totalMoney.forEach(function (x) {
    return (totalInMothn = totalInMothn + x);
  });
  let totalInYear = 0;
  totalYear.forEach(function (x) {
    return (totalInYear = totalInYear + x);
  });
  if (req.user) {
    if (req.user.role == 'admin') {
      res.status(200).render('admin/index', {
        breadcrumb: 'Dashboard',
        totalInMonth,
        totalInYear,
        orderInMonth,
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
