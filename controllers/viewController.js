const Trip = require('../models/tripModel');
const Clinic = require('../models/clinicModel');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async(req, res) => {
  res.status(200).render('home', {
    title: 'Home',
  })
})
exports.getAllTrips = catchAsync(async (req, res) => {
  const docs = await Trip.find();
  res.status(200).render('cards', {
    title: 'Udhetime',
    docs,
  });
});
exports.getAllClinics = catchAsync(async (req, res) => {
  const docs = await Clinic.find();
  res.status(200).render('cards', {
    title: 'Klinika',
    docs,
  });
});

