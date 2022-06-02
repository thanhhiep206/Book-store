const validator = require('validator');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      lowercase: true,
      maxLength: 30,
      validate(value) {
        if (value.length < 6) {
          throw new Error('Name must be more than 6 characters ');
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provid your email'],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    photo: String,
    password: {
      required: [true, 'Please provide your password'],
      select: false,
      type: String,
      minLength: 6,
      maxLength: 30,
      trim: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    passwordConfirm: {
      type: String,
      require: [true, 'Please confirm your password'],
      minLength: 6,
      maxLength: 30,
      trim: true,
      validate(value) {
        if (value !== this.password) {
          throw new Error('Password is invalid');
        }
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// before save in db
userSchema.pre('save', async function (next) {
  // password is hash to continue
  if (!this.isModified('password')) return next();
  //hash password
  this.password = await CryptoJS.AES.encrypt(this.password, process.env.SECRET_KEY).toString();
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.comparePassword = function (passwordSave, passwordReq) {
  //decryptPassword
  const decryptPassword = CryptoJS.AES.decrypt(passwordSave, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

  return decryptPassword === passwordReq;
};
// dulicate key value handle
const User = mongoose.model('User', userSchema);
module.exports = User;
