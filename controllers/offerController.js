const Trip = require('./../models/tripModel');
const Clinic = require('./../models/clinicModel');
const Service = require('./../models/serviceModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOfferOne = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe13a5cba5dd07449aa821');
  const clinic = await Clinic.findById('62f6414531c6012fd40be044');
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  res.status(200).json({
    status: 'success',
    offer: {
      trip,
      clinic,
      services,
    },
  });
});
exports.getOfferTwo = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe14b0cba5dd07449aa828');
  const clinic = await Clinic.findById('63315893ef62f42fc45260b1');
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  res.status(200).json({
    status: 'success',
    offer: {
      trip,
      clinic,
      services,
    },
  });
});
exports.getOfferThree = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe13a5cba5dd07449aa821');
  const clinic = await Clinic.findById('62f6426331c6012fd40be04c');
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  res.status(200).json({
    status: 'success',
    offer: {
      trip,
      clinic,
      services,
    },
  });
});
exports.getOfferFour = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById('62fe14b0cba5dd07449aa828');
  const clinic = await Clinic.findById('6367ec1ca0bfaf07008cd1dd');
  const filter = { clinic: clinic };
  const services = await Service.find(filter);
  res.status(200).json({
    status: 'success',
    offer: {
      trip,
      clinic,
      services,
    },
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
    // console.log('The clinic requested is no longer available');
    console.log(clinic1, clinic2, clinic3, clinic4);
  res.status(200).render('cards', {
    title: 'Oferta',
    offers,
  });
  next();
});
