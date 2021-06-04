const mongoose = require('mongoose');
const Movie = require('./movieModel');
const Hall = require('./hallModel');

const scheduleSchema = new mongoose.Schema(
  {
    screeningStart: {
      type: Date,
      min: Date.now(),
      required: [true, 'Schedule must have a movie screening time']
    },
    screeningEnd: Date,
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Schedule must belong to a movie']
    },
    hall: {
      type: Object,
      required: [true, 'Schedule must belong to a hall']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create nested objects of movie and hall.
scheduleSchema.pre('save', async function(next) {
  this.movie = await Movie.findById(this.movie);
  this.hall = await Hall.findById(this.hall);

  next();
});

scheduleSchema.pre('save', function(next) {
  const end = new Date(this.screeningStart);
  end.setTime(end.getTime() + 1000 * 60 * this.movie.duration);
  this.screeningEnd = end;

  next();
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
