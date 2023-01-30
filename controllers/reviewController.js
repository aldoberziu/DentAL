const Review = require('./../models/reviewModel');
const factory = require('./../controllers/handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setTripId = (req, res, next) => {
  if (!req.body.trip) req.body.trip = req.params.tripId;
  next();
};
exports.setHotelId = (req, res, next) => {
  if (!req.body.hotel) req.body.hotel = req.params.hotelId;
  next();
};
exports.getAllClinicReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.clinicId) filter = { clinic: req.params.clinicId };
  const reviews = await Review.find(filter);
  if (!reviews || reviews.length === 0)
    return next(new AppError('No reviews found for this clinic.'), 404);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.getAllHotelReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.hotelId) filter = { hotel: req.params.hotelId };
  const reviews = await Review.find(filter);
  if (!reviews || reviews.length === 0)
    return next(new AppError('No reviews found for this hotel.'), 404);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.getAllTripReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tripId) filter = { trip: req.params.tripId };
  const reviews = await Review.find(filter);
  if (!reviews || reviews.length === 0)
    return next(new AppError('No reviews found for this trip.'), 404);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.getAllReviews = factory.getAll(Review);
exports.getOneReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
