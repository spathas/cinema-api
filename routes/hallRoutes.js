const express = require('express');
const hallController = require('../controllers/hallController');
const authController = require('../controllers/authController');

//Route
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(hallController.getAllHalls)
  .post(authController.restrictTo('admin'), hallController.createHall);

router
  .route('/:id')
  .get(hallController.getHall)
  .delete(authController.restrictTo('admin'), hallController.deleteHall)
  .patch(authController.restrictTo('admin'), hallController.updateHall);

module.exports = router;
