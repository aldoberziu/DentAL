const Email = require('./../models/emailModel');
const factory = require('./handlerFactory');

exports.setEmailUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };

exports.getAllEmails = factory.getAll(Email);
exports.getOneEmail = factory.getOne(Email);
exports.createEmail = factory.createOne(Email);
exports.deleteEmail = factory.deleteOne(Email);