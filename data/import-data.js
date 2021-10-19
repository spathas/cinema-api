const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');
const Hall = require('../models/hallModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Schedule = require('../models/scheduleModel');
const Booking = require('../models/bookingModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, 'utf-8'));
const halls = JSON.parse(fs.readFileSync(`${__dirname}/halls.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
const schedules = JSON.parse(
  fs.readFileSync(`${__dirname}/schedules.json`, 'utf-8')
);
const bookings = JSON.parse(
  fs.readFileSync(`${__dirname}/bookings.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Movie.create(movies);
    await Hall.create(halls);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    await Schedule.create(schedules);
    await Booking.create(bookings, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await Hall.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Schedule.deleteMany();
    await Booking.deleteMany();
    Review.collection.dropAllIndexes(function(err, results) {
      const msg = !err ? 'Indexes dropped' : err;
      console.log(msg);
    });
    Booking.collection.dropAllIndexes(function(err, results) {
      const msg = !err ? 'Indexes dropped' : err;
      console.log(msg);
    });
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
