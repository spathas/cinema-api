const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.ObjectId,
    ref: 'Schedule',
    required: [true, 'Booking must belong to a schedule!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  seat: [String],
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate('schedule');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
