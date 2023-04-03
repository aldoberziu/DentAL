const Trip = require('../models/tripModel');
const Clinic = require('../models/clinicModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHome = catchAsync(async (req, res) => {
  res.status(200).render('home', {
    title: 'Home',
  });
});
exports.getAllTrips = catchAsync(async (req, res) => {
  const docs = await Trip.find();
  res.status(200).render('cards', {
    title: 'Udhetime',
    docs,
  });
});
exports.getOneTrip = catchAsync(async (req, res, next) => {
  const doc = await Trip.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating createdAt',
    options: { sort: '-createdAt' },
  });
  if (!doc) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('detailedTrip', {
    title: doc.name,
    doc,
  });
});
exports.getAllClinics = catchAsync(async (req, res) => {
  const docs = await Clinic.find();
  res.status(200).render('cards', {
    title: 'Klinika',
    docs,
  });
});
exports.getOneClinic = catchAsync(async (req, res) => {
  const doc = await Clinic.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'review rating createdAt',
      options: { sort: '-createdAt' },
    })
    .populate({
      path: 'services',
      fields: 'name price description',
    });
  if (!doc) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('detailedClinic', {
    title: doc.name,
    doc,
  });
});
exports.getAllOffers = catchAsync(async (req, res, next) => {
  const trip1 = await Trip.findById('62fe13a5cba5dd07449aa821');
  const clinic1 = await Clinic.findById('62f6414531c6012fd40be044').populate({
    path: 'services',
    fields: 'name price description',
  });

  const trip2 = await Trip.findById('62fe14b0cba5dd07449aa828');
  const clinic2 = await Clinic.findById('62f641cb31c6012fd40be046').populate({
    path: 'services',
    fields: 'name price description',
  });

  const trip3 = await Trip.findById('63be92bfdc39712b80b8654e');
  const clinic3 = await Clinic.findById('62f6420931c6012fd40be048').populate({
    path: 'services',
    fields: 'name price description',
  });

  const trip4 = await Trip.findById('63be92bfdc39712b80b8654e');
  const clinic4 = await Clinic.findById('62f6426331c6012fd40be04c').populate({
    path: 'services',
    fields: 'name price description',
  });

  const offers = [
    [trip1, clinic1],
    [trip2, clinic2],
    [trip3, clinic3],
    [trip4, clinic4],
  ];
  if (!trip1 || !trip2 || !trip3 || !trip4)
    console.log('The trip requested is no longer available');
  if (!clinic1 || !clinic2 || !clinic3 || !clinic4)
    console.log('The clinic requested is no longer available');
  res.status(200).render('cards', {
    title: 'Oferta',
    offers,
  });
  next();
});
exports.getOfferOne = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe13a5cba5dd07449aa821')
  const clinic = await Clinic.findById('62f6414531c6012fd40be044')
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  const tripFilter = { trip: trip };
  const tripReviews = await Review.find(tripFilter);
  const clinicReviews = await Review.find(filter);
  const reviews = [...tripReviews, ...clinicReviews];
  res.status(200).render('detailedOffer', {
    title: 'Offer 1',
    offer: {
      trip,
      clinic,
      services,
      reviews,
    },
  });
});
exports.getOfferTwo = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe14b0cba5dd07449aa828')
  const clinic = await Clinic.findById('62f641cb31c6012fd40be046')
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  const tripFilter = { trip: trip };
  const tripReviews = await Review.find(tripFilter);
  const clinicReviews = await Review.find(filter);
  const reviews = [...tripReviews, ...clinicReviews];
  res.status(200).render('detailedOffer', {
    title: 'Offer 2',
    offer: {
      trip,
      clinic,
      services,
      reviews,
    },
  });
});
exports.getOfferThree = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('63be92bfdc39712b80b8654e')
  const clinic = await Clinic.findById('62f6420931c6012fd40be048')
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  const tripFilter = { trip: trip };
  const tripReviews = await Review.find(tripFilter);
  const clinicReviews = await Review.find(filter);
  const reviews = [...tripReviews, ...clinicReviews];
  res.status(200).render('detailedOffer', {
    title: 'Offer 1',
    offer: {
      trip,
      clinic,
      services,
      reviews,
    },
  });
});
exports.getOfferFour = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('63be92bfdc39712b80b8654e')
  const clinic = await Clinic.findById('62f6426331c6012fd40be04c')
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  const tripFilter = { trip: trip };
  const tripReviews = await Review.find(tripFilter);
  const clinicReviews = await Review.find(filter);
  const reviews = [...tripReviews, ...clinicReviews];
  res.status(200).render('detailedOffer', {
    title: 'Offer 4',
    offer: {
      trip,
      clinic,
      services,
      reviews,
    },
  });
});
exports.getAccount = catchAsync(async (req, res) => {
  const filter = { user: req.user.id };
  const reviews = await Review.find(filter);
  res.status(200).render('account', {
    title: 'Your account',
    reviews,
  });
});
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create an account',
  });
};
