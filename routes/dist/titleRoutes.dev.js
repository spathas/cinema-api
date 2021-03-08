"use strict";

var express = require('express');

var titleController = require('../controllers/titleController');

var authController = require('../controllers/authController'); // const reviewController = require('../controllers/reviewController');


var reviewRouter = require('./reviewRoutes');

var router = express.Router();
router.use('/:titleId/reviews', reviewRouter);
router.route('/').get(titleController.getAllTitles).post(authController.protect, authController.restrictTo('admin'), titleController.createTitle);
router.route('/:id').get(titleController.getTitle).patch(authController.protect, authController.restrictTo('admin'), titleController.updateTitle)["delete"](authController.protect, authController.restrictTo('admin'), titleController.deleteTitle); // router
//   .route('/:titleId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.setTourUserIds,
//     reviewController.createReview
//   );

module.exports = router;
//# sourceMappingURL=titleRoutes.dev.js.map
