const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');

//create Book
exports.createBook = catchAsync(async (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    price: req.body.price,
    percentSale: req.body.percentSale,
    author: req.body.author,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    img: req.body.img,
  });
  await newBook.save();
  res.status(201).json({
    status: 'success',
  });
});
//updateBook:id
exports.updateBook = catchAsync(async (req, res) => {
  const bookUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!bookUpdate)
    return res.status(400).json({
      status: 'fail',
      msg: 'not find book to update',
    });
  res.status(201).json({
    status: 'success',
    msg: `update ${bookUpdate.name} sucessfully`,
  });
});
//deleteBook:id
exports.deleteOneBook = catchAsync(async (req, res) => {
  const bookDelete = await Book.findByIdAndDelete(req.params.id);
  if (!bookDelete)
    return res.status(400).json({
      status: 'fail',
      msg: 'not find book to delete',
    });
  res.status(201).json({
    status: 'success',
    msg: `delete ${bookDelete.name} sucessfully`,
  });
});
exports.deleteAllBook = catchAsync(async (req, res) => {
  await Book.deleteMany();
  res.status(201).json({
    status: 'success',
    msg: `delete all sucessfully`,
  });
});
//getAllBook
exports.getAllBook = catchAsync(async (req, res) => {
  const book = await Book.find();
  res.status(201).json({
    status: 'success',
    book,
  });
});
//getOneBook
exports.getOneBook = catchAsync(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(400).json({
      status: 'fail',
      msg: 'not find book ',
    });
  res.status(201).json({
    status: 'success',
    book,
    msg: ` ${book.name} sucessfully`,
  });
});
