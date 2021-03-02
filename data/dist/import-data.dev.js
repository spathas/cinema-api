"use strict";

var fs = require('fs');

var mongoose = require('mongoose');

var dotenv = require('dotenv');

var Title = require('../models/titleModel');

var Hall = require('../models/hallModel');

var User = require('../models/userModel');

dotenv.config({
  path: './config.env'
});
var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  return console.log('DB connection successful!');
}); // READ JSON FILE

var titles = JSON.parse(fs.readFileSync("".concat(__dirname, "/titles.json"), 'utf-8'));
var halls = JSON.parse(fs.readFileSync("".concat(__dirname, "/halls.json"), 'utf-8'));
var users = JSON.parse(fs.readFileSync("".concat(__dirname, "/users.json"), 'utf-8')); // IMPORT DATA INTO DB

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
          return regeneratorRuntime.awrap(User.create(users, {
            validateBeforeSave: false
          }));

        case 7:
          console.log('Data successfully loaded!');
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
          process.exit();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
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
          console.log('Data successfully deleted!');
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 9:
          process.exit();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
//# sourceMappingURL=import-data.dev.js.map
