const { Schema, model } = require('mongoose');

const cartgorySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  img: String,
});

const Cartgory = model('Cartgory', cartgorySchema);

module.exports = Cartgory;
