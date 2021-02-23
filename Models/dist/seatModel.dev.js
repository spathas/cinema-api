"use strict";

var mongoose = require('mongoose');

var seatSchema = new mongoose.Schema({
  numberID: {
    type: Number,
    required: [true, 'Please provide a room number.']
  },
  available: Boolean
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
var Room = mongoose.model('Room', seatSchema);
module.exports = Room;
//# sourceMappingURL=seatModel.dev.js.map
