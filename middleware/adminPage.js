//statistical
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
//total money in per day
exports.getDashboard = catchAsync(async (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'admin') {
      const totalMoneyDay = await Order.find({ createAt: new Date() });
      console.log(totalMoneyDay);
      res.status(200).render('admin/index', {
        breadcrumb: 'Dashboard',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
