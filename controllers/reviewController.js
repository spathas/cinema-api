const Review = require('./../models/reviewModel');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.movie) req.body.movie = req.params.movieId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkCurrentUserUserId = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  const userId = `"${req.user.id}"`;
  const reviewUserId = JSON.stringify(review.user._id);

  if (userId !== reviewUserId) {
    return next(
      new AppError('Users can only handle their personal comments', 404)
    );
  }
  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
