const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');

exports.addComment = catchAsync(async (req, res, next) => {
  const comment = new Comment({
    user: req.user.id,
    book: req.params.bookId,
    content: req.body.content,
  });

  await comment.save();
  //reloAD PAGE
  res.redirect(req.get('referer'));
});
