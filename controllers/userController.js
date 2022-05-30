const User = require('../models/userModel');
const factory = require('./refactoryController');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp'); //resize img upload
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Erorr('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.file.filename);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/${req.file.filename}`);

  next();
});
//for each user update  yourseft
// exports.getMe= (req,res,next)=>{

//    next()
// }
//allow field  update
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res) => {
  console.log(req.file);
  //update User allow field\
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  console.log(updatedUser);
  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
  });
});
//for admin
exports.getOneUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);
exports.createOneUser = factory.createOne(User);
exports.deleteOneUser = factory.deleteOne(User);
exports.deleteAllUser = factory.deleteAll(User);
exports.updateOneUser = factory.updateOne(User);
