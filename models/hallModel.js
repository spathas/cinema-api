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
  let seatsQuantity = 0;
  for (let i = 0; i < this.seatsSchema.length; i++) {
    for (let j = 0; j < this.seatsSchema[i].length; j++) {
      if (this.seatsSchema[i][j] === 'open') ++seatsQuantity;
    }
  }
  return seatsQuantity;
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
