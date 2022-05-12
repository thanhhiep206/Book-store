const factory = require('./factory');
const Cartgory = require('../models/cartgoryModel');

exports.getOneCartgory = factory.getOne(Cartgory);
exports.getAllCartgory = factory.getAll(Cartgory);
exports.createOneCartgory = factory.createOne(Cartgory);
exports.deleteOneCartgory = factory.deleteOne(Cartgory);
exports.deleteAllCartgory = factory.deleteAll(Cartgory);
exports.updateOneCartgory = factory.updateOne(Cartgory);
