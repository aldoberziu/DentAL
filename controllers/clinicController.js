const Clinic = require('./../models/clinicModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.bestClinics = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-rating';
  req.query.fields = 'name, rating, ratingsQuantity';
  next();
};
exports.getAllClinics = factory.getAll(Clinic);
exports.getOneClinic = factory.getOne(Clinic, { path: 'services reviews'});
exports.createClinic = factory.createOne(Clinic);
exports.updateClinic = factory.updateOne(Clinic);
exports.deleteClinic = factory.deleteOne(Clinic);

exports.getClinicsStats = catchAsync(async (req, res, next) => {
  const stats = await Clinic.aggregate([
    {
      $match: { $rating: { $gte: 4.5 } },
    },
    {
      $group: {
        totalNumRatings: { $sum: '$ratingsQuantity' },
      },
    },
    {
      $sort: { $rating: 1 },
    },
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    }),
  ]);
  next();
}); //////////////////////