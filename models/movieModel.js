const mongoose = require('mongoose');
// const User = require('./userModel');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'A movie must have a release year']
    },
    writers: {
      type: [String],
      required: [true, 'A movie must have a writer']
    },
    director: {
      type: [String],
      required: [true, 'A movie must have a director']
    },
    duration: {
      type: Number,
      required: [true, 'A movie must have a duration']
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A movie must have a description']
    },
    story: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A movie must have a cover image']
    },
    trailer: {
      type: String,
      required: [true, 'A movie must have a trailer']
    },
    category: {
      type: [String],
      required: [true, 'A movie must have at least one category']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
