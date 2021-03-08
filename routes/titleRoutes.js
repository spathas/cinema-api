const express = require('express');
const titleController = require('../controllers/titleController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:titleId/reviews', reviewRouter);

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

// router
//   .route('/:titleId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.setTourUserIds,
//     reviewController.createReview
//   );

module.exports = router;
