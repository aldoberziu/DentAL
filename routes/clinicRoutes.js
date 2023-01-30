const express = require('express');
const clinicController = require('./../controllers/clinicController');
const serviceRouter = require('./../routes/serviceRoutes');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:clinicId/services', serviceRouter);
router.use('/:clinicId/reviews', reviewRouter);

router
  .route('/')
  .get(clinicController.getAllClinics)
  .post(clinicController.createClinic);

router
  .route('/best-clinics')
  .get(clinicController.bestClinics, clinicController.getAllClinics);

router
  .route('/:id/:x?')
  .get(clinicController.getOneClinic)
  .patch(clinicController.updateClinic)
  .delete(clinicController.deleteClinic);

module.exports = router;
