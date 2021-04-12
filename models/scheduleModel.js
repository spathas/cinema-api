const mongoose = require('mongoose');
const Movie = require('./movieModel');
const Hall = require('./hallModel');

const scheduleSchema = new mongoose.Schema(
  {
    screeningStart: {
      type: Date
      //   min: Date.now()
    },
    screeningEnd: Date,
    movie: Object,
    hall: Object
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

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
