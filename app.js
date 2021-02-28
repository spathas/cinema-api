const express = require('express');
const morgan = require('morgan');

const titleRouter = require('./routes/titleRoutes');
const hallRouter = require('./routes/hallRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/titles', titleRouter);
app.use('/api/v1/halls', hallRouter);

module.exports = app;
