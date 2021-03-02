"use strict";

var User = require('../models/userModel');

var catchAsync = require('../utils/catchAsync');

var AppError = require('../utils/appError');

var factory = require('./handlerFactory');

var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = function (req, res, next) {
  req.params.id = req.user.id;
  next();
}; // UpdateMe update data of current user.


exports.updateMe = catchAsync(function _callee(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.password || req.body.passwordConfirm)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next(new AppError('This router does not support password update. Please visit /updateMyPassword.', 400)));

        case 2:
          // Filtered out unwanted fields names that are not allowed to be updated.
          filteredBody = filterObj(req.body, 'name', 'email'); // Update user document.

          _context.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedUser = _context.sent;
          res.status(200).json({
            status: 'success',
            user: updatedUser
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.deleteMe = catchAsync(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined. Please use signup route instead.'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
//# sourceMappingURL=userController.dev.js.map
