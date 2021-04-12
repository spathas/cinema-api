const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authController = require('../controllers/authController');

//Route
const router = express.Router();

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
    authController.restrictTo('admin'),
    scheduleController.updateSchedule
  );

router
  .route('/:id/hall')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    scheduleController.updateScheduleHall
  );

module.exports = router;
