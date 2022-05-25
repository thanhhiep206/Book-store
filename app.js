const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
//use middleware built in
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  // app.use(morgan('tiny'));
}
// app.use((req, res, next) => {
//   // console.log(req.cookies);
//   next();
// });
///use Router
app.use('/', require('./routers/viewRouter'));
app.use('/api/v1/carts', require('./routers/cartRouter'));
app.use('/api/v1/reviews', require('./routers/reviewRouter'));
app.use('/api/v1/books', require('./routers/bookRouter'));
app.use('/api/v1/users', require('./routers/userRouter'));
module.exports = app;
