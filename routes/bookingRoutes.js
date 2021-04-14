const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

// Route
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/me')
  .get(
    authController.restrictTo('user'),
    bookingController.getAllBookingsByUser
  );

router
  .route('/')
  .get(authController.restrictTo('admin'), bookingController.getAllBookings)
  .post(
    bookingController.setScheduleUserIds,
    bookingController.chechSeatAvailability,
    bookingController.createBooking
  );

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
