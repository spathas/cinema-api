const Movies = require('../models/movieModel');

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
