const Booking = require('../models/bookingModel');
const Schedule = require('../models/scheduleModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBookings = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.setScheduleUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.schedule) req.body.schedule = req.params.scheduleId;
  if (req.user.role === 'user') req.body.user = req.user.id;
  next();
};

// Block bookings with the same seats references or exceed the limit of hall quantity.
exports.chechSeatAvailability = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.body.schedule);

  const queryParams = req.body.seat.map(e => {
    if (schedule.hall.seatsQuantity)
      return next(
        new AppError(
          "You can't choose seat with number which is exceeds the seat quantity limit.",
          500
        )
      );
    return { seat: e };
  });

  const query = await Booking.find({ $or: queryParams });

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

exports.getAllBookingsByUser = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});
