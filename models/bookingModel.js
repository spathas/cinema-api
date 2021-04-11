const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hall',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
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
  this.populate('user').populate('hall');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
