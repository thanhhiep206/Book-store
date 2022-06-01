const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: 'rejections.log' })],
});

//   winston.add(new winston.transports.MongoDB,{db:'mongodb+srv://dthadmin:hiephihi123@cluster0.owazy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'});
module.exports = function (err, req, res, next) {
  logger.log({
    level: 'error',
    message: err.message,
  });
  //middle ware erro
  res.status(404).render('error', {
    title: 'Not found router ',
    user: null,
    style: 'cart',
    message: err.message,
  });
};
