const express = require('express');
const bookingController = require('../controllers/bookingController');
// const authController = require('../controllers/authController');

// Route
const router = express.Router();

// router.use(authController.protect);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(
    bookingController.chechSeatAvailability,
    bookingController.createBooking
  );

// router.use(authController.restrictTo('Booking'));

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
