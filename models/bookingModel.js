const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
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
    seats: {
      type: [String],
      required: [true, 'Booking must have an array of seats.']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// bookingSchema.index({ schedule: 1, user: 1 }, { unique: true });

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate('schedule');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
