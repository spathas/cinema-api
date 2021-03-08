"use strict";

var mongoose = require('mongoose');

var Title = require('./titleModel');

var reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  title: {
    type: mongoose.Schema.ObjectId,
    ref: 'Title',
    required: [true, 'Review must belong to a movie title.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
reviewSchema.index({
  title: 1,
  user: 1
}, {
  unique: true
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = function _callee(titleId) {
  var stats;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.aggregate([{
            $match: {
              title: titleId
            }
          }, {
            $group: {
              _id: '$title',
              nRating: {
                $sum: 1
              },
              avgRating: {
                $avg: '$rating'
              }
            }
          }]));

        case 2:
          stats = _context.sent;

          if (!(stats.length > 0)) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Title.findByIdAndUpdate(titleId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
          }));

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(Title.findByIdAndUpdate(titleId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

reviewSchema.index({
  tour: 1,
  user: 1
}, {
  unique: true
});
reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.title);
}); // findByIdAndUpdate
// findByIdAndDelete

reviewSchema.pre(/^findOneAnd/, function _callee2(next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.findOne());

        case 2:
          this.r = _context2.sent;
          // console.log(this.r);
          next();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
reviewSchema.post(/^findOneAnd/, function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(this.r.constructor.calcAverageRatings(this.r.title));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
//# sourceMappingURL=reviewModel.dev.js.map
