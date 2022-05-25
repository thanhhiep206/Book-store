const Stripe = require('stripe');
//process.env not working
const stripe = Stripe(
  'sk_test_51L2suxEvR2fI04fev5mtTHoIsZ9VATmjvxVVxcbTrdej7KtQUOgklQeMrLW4Ibvk48ReZo7pA2C7fKqWA0zGG1ZU00zP6PIOpg'
);
const Book = require('../models/bookModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const book = await Book.findById(req.params.bookId);
  console.log(book);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/my-books/?book=${req.params.bookId}&user=${req.user.id}&price=${
      book.price
    }`,
    cancel_url: `${req.protocol}://${req.get('host')}/book/${book.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.bookId,
    line_items: [
      {
        name: book.name,
        description: book.description,
        images: book.img,
        amount: book.priceafterSale * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { book, user, price } = req.query;

  if (!book && !user && !price) return next();
  await Order.create({ book, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
