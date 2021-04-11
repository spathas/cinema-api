const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: [true, 'A hall must have a hall number.']
    },
    price: {
      type: Number,
      required: [true, 'A hall must have a price number']
    },
    seatsQuantity: {
      type: Number,
      required: [true, 'You have to set the quantity of the hall.']
    },
    typeOfHall: {
      type: String,
      default: 'classic'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
