const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Login or register your account ',
  });
};
exports.getIndex = (req, res) => {
  res.status(200).render('index', {
    title: 'LoveBook store for everyone',
  });
};
