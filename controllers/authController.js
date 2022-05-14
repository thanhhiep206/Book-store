const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
//sign jwt id
const JWT_EXPIRES_IN = '20h';
const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  // set expires cookie but error i set expires in this comment
  // expires: new Date(Date.now() + 10 * 60 * 1000 * 100000),
  res.cookie('jwt', token, {
    httpOnly: true,
  });
  console.log(token);
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
exports.logout = (req, res) => {
  //clearCookie to delete toke inside jwt not delete jwt
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

//isLoggined check user isLoggined to render UI ?
exports.isLoggined = async (req, res, next) => {
  // base on jwt save in cookie to detect user isLoggined
  if (req.cookies.jwt) {
    try {
      const decoded = await util.promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_KEY);
      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        throw new Error(' User not loggin Please login to continue');
      }
      res.locals = user;
      req.user = user;

      return next();
    } catch (e) {
      return next();
    }
  }

  next();
};
