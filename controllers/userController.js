const User = require('../models/userModel');
const factory = require('./refactoryController');
const catchAsync = require('../utils/catchAsync');

//for admin
exports.getOneUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);
exports.createOneUser = factory.createOne(User);
exports.deleteOneUser = factory.deleteOne(User);
exports.deleteAllUser = factory.deleteAll(User);
exports.updateOneUser = factory.updateOne(User);

//for each user update  yourseft
// exports.getMe= (req,res,next)=>{

//    next()
// }
exports.updateMe = catchAsync(async (req, res) => {
  //update User allow field\
  // You pick only allowed fields from submitted body
  let user = req.user;
  let allowedFields = { name: req.body.name };

  //  // Override the current user data with new one
  user = Object.assign(user, allowedFields);
  await user.save();
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
