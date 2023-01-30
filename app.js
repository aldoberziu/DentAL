const express = require('express');
const path = require('path')
const AppError = require('./utils/appError');

const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('views'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())

app.use(function (req, res, next) {
    var url = req.url;
    const endpoint = req.url;
      res.locals.endpoint = endpoint;
    next();
  });

app.use('/', viewRouter);

// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
//   });

module.exports = app;
