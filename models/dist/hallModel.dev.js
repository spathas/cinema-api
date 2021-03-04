"use strict";

var mongoose = require('mongoose');

var hallSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'A hall must have a hall number.']
  },
  seatsQuantity: {
    type: Number,
    required: [true, 'You have to set the quantity of the hall.']
  },
  typeOfHall: {
    type: String,
    "default": 'classic'
  }
});
var Hall = mongoose.model('Hall', hallSchema);
module.exports = Hall;
//# sourceMappingURL=hallModel.dev.js.map
