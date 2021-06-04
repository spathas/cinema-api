const Movies = require('../models/movieModel');
const Schedule = require('../models/scheduleModel');

const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const movies = await Movies.find();

  res.status(200).render('main', {
    title: 'Athens Cinemas',
    movies
  });
});

exports.getMovie = catchAsync(async (req, res) => {
  const movie = await Movies.findById(req.params.id).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  res.status(200).render('movie', {
    title: movie.name,
    movie
  });
});

exports.getSchedules = catchAsync(async (req, res) => {
  const schedules = await Schedule.find({
    movie: req.params.id
  }).populate({
    path: 'movie'
  });

  res.status(200).render('bookingForm', {
    schedules,
    movie: schedules[0].movie
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('loginForm', {
    title: 'Athens Cinemas'
  });
});
