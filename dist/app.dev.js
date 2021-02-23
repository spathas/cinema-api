"use strict";

var express = require('express');

var morgan = require('morgan');

var app = express(); // 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express["static"]("".concat(__dirname, "/public")));
app.use(function (req, res, next) {
  console.log('Hello from the middleware 👋');
  next();
});
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}); // 3) ROUTES

module.exports = app;
//# sourceMappingURL=app.dev.js.map
