const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          `No document found with ID=${req.params.id}. Please try another ID`
        ),
        404
      );
    }
    res.status(204).json({
      status: 'success',
      data: {
        data: doc,
      },
      message: 'Document just got successfully deleted!',
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newDoc) {
      return next(
        new AppError('No clinic found with that ID! Try a different one :)'),
        404
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: newDoc,
      },
      message: 'Document details have just been updated :)',
    });
    next();
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
    next();
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query;
    query = Model.findById(req.params.id);
    if(popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404)); //return cuz we wanna skip these next lines which give us a 200 status code
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
    next();
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tripId) filter = { trip: req.params.tripId };
    const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const doc = await features.query;

    if (!doc)
      return next(
        new AppError(
          'There are no documents in the database. Create one first!'
        ),
        404
      );

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
    next();
  });
