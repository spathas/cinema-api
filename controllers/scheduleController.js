const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Schedule = require('../models/scheduleModel');
const Movie = require('../models/movieModel');
const Hall = require('../models/hallModel');
const factory = require('./handleFactory');

exports.getAllSchedules = factory.getAll(Schedule);
exports.getSchedule = factory.getOne(Schedule);
exports.createSchedule = factory.createOne(Schedule);
exports.updateSchedule = factory.updateOne(Schedule);
exports.deleteSchedule = factory.deleteOne(Schedule);

exports.checkSchedule = catchAsync(async (req, res, next) => {
  // Get duration from inserted movie.
  let movieDuration = await Movie.findById(req.body.movie);
  movieDuration = movieDuration.duration;

  // Calculate movie end time.
  const end = new Date(req.body.screeningStart);
  end.setTime(end.getTime() + 1000 * 60 * movieDuration);

  // Find hall to handle hall number
  const hall = await Hall.findById(req.body.hall);

  // Find if there is movies at this time in same hall.
  const schedule = await Schedule.find({
    $and: [
      {
        screeningStart: { $lte: end },
        screeningEnd: { $gte: req.body.screeningStart },
        'hall.number': { $eq: hall.number }
      }
    ]
  });

  // Send error message if there is at least one movie.
  if (schedule.length !== 0)
    return next(
      new AppError(
        'There is another play at this time. Please check your movie schedule',
        500
      )
    );

  next();
});

exports.updateScheduleHall = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);
  console.log(Object.keys(schedule.hall));
  // console.log(req.body.typeOfHall);

  // for (i in schedule.hall) {
  //   if (i) console.log(i);
  // }

  // Object.entiers(schedule.hall).forEach((key, val) => {
  //   console.log(key);
  //   console.log(val);
  // });

  for (const [key, value] of Object.entries(schedule.hall)) {
    console.log(`${key}: ${value}`);
  }

  // console.log(arr);

  const newHall = res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
