"use strict";

var fs = require('fs');

var mongoose = require('mongoose');

var dotenv = require('dotenv');

var Title = require('../models/titleModel');

var Hall = require('../models/hallModel');

var User = require('../models/userModel');

var Review = require('../models/reviewModel');

dotenv.config({
  path: './config.env'
});
var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB connection successful!');
}); // READ JSON FILE

var titles = JSON.parse(fs.readFileSync("".concat(__dirname, "/titles.json"), 'utf-8'));
var halls = JSON.parse(fs.readFileSync("".concat(__dirname, "/halls.json"), 'utf-8'));
var users = JSON.parse(fs.readFileSync("".concat(__dirname, "/users.json"), 'utf-8'));
var reviews = JSON.parse(fs.readFileSync("".concat(__dirname, "/reviews.json"), 'utf-8')); // IMPORT DATA INTO DB

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Title.create(titles));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Hall.create(halls));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(Review.create(reviews));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(User.create(users, {
            validateBeforeSave: false
          }));

        case 9:
          console.log('Data successfully loaded!');
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 15:
          process.exit();

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // DELETE ALL DATA FROM DB


var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Title.deleteMany());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.deleteMany());

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(Review.deleteMany());

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(Hall.deleteMany());

        case 9:
          console.log('Data successfully deleted!');
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 15:
          process.exit();

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
//# sourceMappingURL=import-data.dev.js.map
