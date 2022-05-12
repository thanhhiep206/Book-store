const factory = require('./factory');
const Book = require('../models/bookModel');
//create Book
exports.createBook = factory.createOne(Book);
//updateBook:id
exports.updateBook = factory.updateOne(Book);
//deleteBook:id
exports.deleteOneBook = factory.deleteOne(Book);
exports.deleteAllBook = factory.deleteAll(Book);
//getAllBook
exports.getAllBook = factory.getAll(Book, { path: 'reviews' });
//getOneBook
exports.getOneBook = factory.getOne(Book, { path: 'reviews' });
