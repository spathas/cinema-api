"use strict";

var express = require('express');

var titleController = require('../controllers/titleController');

var authController = require('../controllers/authController');

var router = express.Router();
router.route('/').get(titleController.getAllTitles).post(authController.protect, authController.restrictTo('admin'), titleController.createTitle);
router.route('/:id').get(titleController.getTitle).patch(authController.protect, authController.restrictTo('admin'), titleController.updateTitle)["delete"](authController.protect, authController.restrictTo('admin'), titleController.deleteTitle);
module.exports = router;
//# sourceMappingURL=titleRoutes.dev.js.map
