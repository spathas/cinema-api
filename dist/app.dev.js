"use strict";

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean'); // const hpp = require('hpp');


var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var titleRouter = require('./routes/titleRoutes');

var userRouter = require('./routes/userRoutes');

var hallRouter = require('./routes/hallRoutes');

var app = express(); // 1) GLOBAL MIDDLEWARE
// Set security HTTP headers

app.use(helmet()); // Development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
})); // Data sanitization against NoSQL query injection

app.use(mongoSanitize()); // Data sanitization against XSS

app.use(xss()); // Prevent parameter pollution
// Serving static files

app.use(express["static"]("".concat(__dirname, "/public"))); // Test middleware

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString(); // console.log(req.headers);

  next();
}); // 3) ROUTES

app.use('/api/v1/titles', titleRouter);
app.use('/api/v1/halls', hallRouter);
app.use('/api/v1/users', userRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
