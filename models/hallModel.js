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
    seatsSchema: {
      type: [[String]],
      enum: ['open', 'closed', 'empty', 'disabled'],
      required: [true, 'A hall must have schema of seats']
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

hallSchema.virtual('seatsQuantity').get(function() {
  let seatsQuantity;
  for (let i = 0; i < this.seatsColumns.length; i++) {
    seatsQuantity += array[i];
  }
  return seatsQuantity;
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
