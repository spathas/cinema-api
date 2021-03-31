const express = require('express');
const movieController = require('../controllers/movieController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:movieId/reviews', reviewRouter);

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    movieController.createMovie
  );

router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    movieController.updateMovie
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    movieController.deleteMovie
  );

// router
//   .route('/:movieId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.setTourUserIds,
//     reviewController.createReview
//   );

module.exports = router;
