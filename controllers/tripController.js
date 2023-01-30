const Trip = require('./../models/tripModel');
const factory = require('./../controllers/handlerFactory');

exports.bestTrips = (req, res, next) => {
  req.query.limit = 2;
  req.query.sort = 'price rating distance ratingsQuantity duration';
  req.query.fields = 'name, price, destination, rating, ratingsQuantity';
  next();
};

exports.getAllTrips = factory.getAll(Trip);
exports.getOneTrip = factory.getOne(Trip, { path: 'reviews' });
exports.createTrip = factory.createOne(Trip);
exports.updateTrip = factory.updateOne(Trip);
exports.deleteTrip = factory.deleteOne(Trip);