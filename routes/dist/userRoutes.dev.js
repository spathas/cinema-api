"use strict";

var express = require('express');

var userController = require('../controllers/userController');

var authController = require('../controllers/authController'); // Route


var router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword); // Protected routes after this middleware.

router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router["delete"]('/deleteMe', userController.deleteMe); // Ask permission after this middleware

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser)["delete"](userController.deleteUser);
module.exports = router;
//# sourceMappingURL=userRoutes.dev.js.map
