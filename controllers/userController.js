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
    cb(new Erorr('Vui lòng tải ảnh lên'), false);
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

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res) => {
  let user = req.user;
  //allow field  update
  let allowedFields = { name: req.body.name, photo: req.file.filename };
  user = Object.assign(user, allowedFields);
  await user.save();
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
//for admin
exports.getOneUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);
exports.createOneUser = factory.createOne(User);
exports.deleteOneUser = factory.deleteOne(User);
exports.deleteAllUser = factory.deleteAll(User);
exports.updateOneUser = factory.updateOne(User);
