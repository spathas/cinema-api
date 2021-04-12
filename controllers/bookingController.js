const Booking = require('../models/bookingModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBookings = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.chechSeatAvailability = catchAsync(async (req, res, next) => {
  const queryParams = req.body.seat.map(e => {
    return { seat: e };
  });

  const query = await Booking.find({ $or: queryParams });

  console.log(query.length);
  if (query.length === 0) {
    return next();
  }

  next(
    new AppError(
      'Those seats are not available for booking. Please try again with another seats.',
      500
    )
  );
});
