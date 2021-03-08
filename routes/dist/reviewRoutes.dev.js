"use strict";

var express = require('express');

var reviewController = require('./../controllers/reviewController');

var authController = require('./../controllers/authController');

var router = express.Router({
  mergeParams: true
});
router.use(authController.protect);
router.route('/').get(reviewController.getAllReviews).post(authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview);
router.route('/:id').get(reviewController.getReview).post(authController.protect, authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview).patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)["delete"](authController.restrictTo('user', 'admin'), reviewController.deleteReview);
module.exports = router;
//# sourceMappingURL=reviewRoutes.dev.js.map
