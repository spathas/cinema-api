const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'A hall must have a hall number.']
  },
  seatsQuantity: {
    type: Number,
    required: [true, 'You have to set the quantity of the hall.']
  },
  typeOfHall: {
    type: String,
    default: 'classic'
  }
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
