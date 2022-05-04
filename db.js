const mongoose = require('mongoose');
//connectDB
const connect = async () => {
  await mongoose.connect(
    'mongodb+srv://dthadmin:hiephihi123@cluster0.owazy.mongodb.net/Book?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('connect successfully')
  );
};

module.exports = connect;
