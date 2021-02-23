const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema(
  {
    numberID: {
      type: Number,
      required: [true, 'Please provide a room number.']
    },
    available: Boolean
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Room = mongoose.model('Room', seatSchema);

module.exports = Room;
