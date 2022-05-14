const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookModel');
exports.search = catchAsync(async (req, res) => {
  const query = req.query.name;
  // find substr , case  sensitive
  const books = await Book.find({ name: new RegExp(query, 'i') });
  res.status(404).render('cartgory', {
    title: 'Danh mục sách',
    books,
    user: req.user,
    style: 'product',
  });
});
