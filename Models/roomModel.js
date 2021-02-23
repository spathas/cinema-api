const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    numberID: {
      type: Number,
      required: [true, 'Please provide a room number.']
    },
    columns: {
      type: Number,
      required: [true, 'Please provide the number of columns in the room.']
    },
    rows: {
      type: Number,
      required: [true, 'Please provide the number of rows in the room.']
    },
    seatsQuantity: {
      type: Number
      // Calculate
    },
    availability: {
      type: Number
      // calculate
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
