const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
