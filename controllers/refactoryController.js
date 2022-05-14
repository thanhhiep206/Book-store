const catchAsync = require('../utils/catchAsync');
//getAll
exports.getAll = (Model, populate) =>
  catchAsync(async (req, res) => {
    let query = Model.find();
    if (populate) query = query.populate(populate);
    const data = await query;
    res.status(201).json({
      status: 'success',
      data,
    });
  });
//getOne
exports.getOne = (Model, populate) =>
  catchAsync(async (req, res) => {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const data = await query;
    if (!data)
      return res.status(400).json({
        status: 'fail',
        msg: 'not find data ',
      });
    res.status(201).json({
      status: 'success',
      data,
    });
  });
//deleteOne
exports.deleteAll = (Model) =>
  catchAsync(async (req, res) => {
    await Model.deleteMany();
    res.status(201).json({
      status: 'success',
      msg: `delete all sucessfully`,
    });
  });
exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const dataDelete = await Model.findByIdAndDelete(req.params.id);
    if (!data)
      return res.status(400).json({
        status: 'fail',
        msg: 'not find data to delete',
      });
    res.status(201).json({
      status: 'success',
      msg: `delete ${dataDelete.name} sucessfully`,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const dataUpdate = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!dataUpdate)
      return res.status(400).json({
        status: 'fail',
        msg: 'not find book to update',
      });
    res.status(201).json({
      status: 'success',
      msg: `update ${dataUpdate.name} sucessfully`,
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newData = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      newData,
    });
  });
