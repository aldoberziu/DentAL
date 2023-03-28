const Service = require('./../models/serviceModel');
const factory = require('./../controllers/handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.setClinicUserId = (req, res, next) => {
  if (!req.body.clinic) req.body.clinic = req.params.clinicId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllServices = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.clinicId) filter = { clinic: req.params.clinicId };
  const services = await Service.find(filter);
  if (!services)
    return next(new AppError('No services found for this clinic.'), 404);

  res.status(200).json({
    status: 'success',
    results: services.length,
    data: {
      services,
    },
  });
});
exports.getOneService = factory.getOne(Service);
exports.createService = factory.createOne(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
