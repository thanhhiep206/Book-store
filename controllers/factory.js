const catchAsync = require('../utils/catchAsync');
//getAll
exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.find();
    res.status(201).json({
      status: 'success',
      data,
    });
  });
//getOne
exports.getOne = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.findById(req.params.id);
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
    const dataUpdate = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
