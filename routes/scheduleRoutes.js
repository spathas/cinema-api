const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authController = require('../controllers/authController');

const bookingRouter = require('./bookingRoutes');

//Route
const router = express.Router();

router.use('/:scheduleId/bookings', bookingRouter);

router
  .route('/')
  .get(scheduleController.getAllSchedules)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    scheduleController.checkSchedule,
    scheduleController.createSchedule
  );

router
  .route('/:id')
  .get(scheduleController.getSchedule)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    scheduleController.deleteSchedule
  )
  .patch(
    authController.protect,
    // authController.restrictTo('admin'),
    scheduleController.updateReqBodyForNestedObjs,
    scheduleController.updateSchedule
  );

module.exports = router;
