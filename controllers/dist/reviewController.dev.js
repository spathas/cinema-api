"use strict";

var Review = require('./../models/reviewModel');

var factory = require('./handlerFactory');

exports.setTourUserIds = function (req, res, next) {
  // Allow nested routes
  if (!req.body.title) req.body.title = req.params.titleId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
//# sourceMappingURL=reviewController.dev.js.map
