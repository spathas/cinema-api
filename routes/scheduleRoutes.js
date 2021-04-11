const express = require('express');
const scheduleController = require('../controllers/scheduleController');

//Route
const router = express.Router();

router
  .route('/')
  .get(scheduleController.getAllSchedules)
  .post(scheduleController.checkSchedule, scheduleController.createSchedule);

router
  .route('/:id')
  .get(scheduleController.getSchedule)
  .delete(scheduleController.deleteSchedule)
  .patch(scheduleController.updateSchedule);

module.exports = router;
