const express = require('express');
const titleController = require('../controllers/titleController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(titleController.getAllTitles)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    titleController.createTitle
  );

router
  .route('/:id')
  .get(titleController.getTitle)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    titleController.updateTitle
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    titleController.deleteTitle
  );

module.exports = router;
