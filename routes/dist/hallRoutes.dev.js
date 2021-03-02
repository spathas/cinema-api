"use strict";

var express = require('express');

var hallController = require('../controllers/hallController');

var authController = require('../controllers/authController'); //Route


var router = express.Router({
  mergeParams: true
});
router.use(authController.protect);
router.route('/').get(hallController.getAllHalls).post(authController.restrictTo('admin'), hallController.createHall);
router.route('/:id').get(hallController.getHall)["delete"](authController.restrictTo('admin'), hallController.deleteHall).patch(authController.restrictTo('admin'), hallController.updateHall);
module.exports = router;
//# sourceMappingURL=hallRoutes.dev.js.map
