const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
//sign jwt id
const JWT_EXPIRES_IN = '20h';
const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  // Remove password from output
  user.password = undefined;
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
//Sign up
exports.signup = catchAsync(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    passwordConfirm: req.body.passwordConfirm,
  });
  if (!newUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'User  existed, Please provide other email to continue',
    });
  }
  await newUser.save();
  sendToken(newUser, res);
});
//login
exports.login = catchAsync(async (req, res) => {
  //check user
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: 'User not exist, Please signup to continue',
    });
  const compare = await user.comparePassword(user.password, password);
  if (!compare)
    return res.status(404).json({
      status: 'fail',
      message: 'password  not correct',
    });
  //check
  sendToken(user, res);
});
//logout
exports.logout = (req, res) => {};
