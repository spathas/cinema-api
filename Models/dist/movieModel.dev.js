"use strict";

var mongoose = require('mongoose'); // const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');


var movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Movie must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A Movie name must have less or equal then 40 characters'],
    minlength: [10, 'A Movie name must have more or equal then 10 characters'] // validate: [validator.isAlpha, 'Movie name must only contain characters']

  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A Movie must have a duration']
  },
  ratingsAverage: {
    type: Number,
    "default": 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: function set(val) {
      return Math.round(val * 10) / 10;
    } // 4.666666, 46.6666, 47, 4.7

  },
  ratingsQuantity: {
    type: Number,
    "default": 0
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A Movie must have a cover image']
  },
  createdAt: {
    type: Date,
    "default": Date.now(),
    select: false
  },
  startDates: [Date],
  secretMovie: {
    type: Boolean,
    "default": false
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
}); // // movieSchema.index({ price: 1 });
// movieSchema.index({ price: 1, ratingsAverage: -1 });
// movieSchema.index({ slug: 1 });
// movieSchema.index({ startLocation: '2dsphere' });
// movieSchema.virtual('durationWeeks').get(function() {
//   return this.duration / 7;
// });
// // Virtual populate
// movieSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'Movie',
//   localField: '_id'
// });
// // DOCUMENT MIDDLEWARE: runs before .save() and .create()
// movieSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// // QUERY MIDDLEWARE
// // movieSchema.pre('find', function(next) {
// movieSchema.pre(/^find/, function(next) {
//   this.find({ secretMovie: { $ne: true } });
//   this.start = Date.now();
//   next();
// });
// movieSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v -passwordChangedAt'
//   });
//   next();
// });
// movieSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
//# sourceMappingURL=movieModel.dev.js.map
