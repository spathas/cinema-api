const mongoose = require('mongoose');
const Title = require('./titleModel');

const reviewSchema = new mongoose.Schema(
  {
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
      default: Date.now
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ title: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function(titleId) {
  const stats = await this.aggregate([
    {
      $match: { title: titleId }
    },
    {
      $group: {
        _id: '$title',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Title.findByIdAndUpdate(titleId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Title.findByIdAndUpdate(titleId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.title);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed.
  await this.r.constructor.calcAverageRatings(this.r.title);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
