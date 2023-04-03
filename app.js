const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const AppError = require('./utils/appError');

const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);


app.use(cookieParser());

app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('images/users'));
app.use(express.static('views'));
app.use(express.static('js'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

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
