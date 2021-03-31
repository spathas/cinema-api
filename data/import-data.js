const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');
const Hall = require('../models/hallModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
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

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Movie.create(movies);
    await Hall.create(halls);
    await Review.create(reviews);
    await User.create(users, { validateBeforeSave: false });
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
    await User.deleteMany();
    await Review.deleteMany();
    await Hall.deleteMany();
    // Review.collection.dropAllIndexes(function(err, results) {
    //   const msg = !err ? 'Indexes dropped' : err;
    //   console.log(msg);
    // });
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
