"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

var app = require('./app');

var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB connection successful!');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "..."));
});
//# sourceMappingURL=server.dev.js.map
