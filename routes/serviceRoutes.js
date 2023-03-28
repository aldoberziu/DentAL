const express = require('express');
const serviceController = require('./../controllers/serviceController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(serviceController.getAllServices)
  .post(serviceController.setClinicUserId, serviceController.createService);

router
  .route('/:id')
  .get(serviceController.getOneService)
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
