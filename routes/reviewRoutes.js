const express = require('express');
const reviewController = require('./../controllers/reviewController');
const serviceController = require('./../controllers/serviceController');

const router = express.Router({ mergeParams: true });

router
  .route('/trip')
  .get(reviewController.getAllTripReviews)
  .post(reviewController.setTripId, reviewController.createReview);

router
  .route('/hotel')
  .get(reviewController.getAllHotelReviews)
  .post(reviewController.setHotelId, reviewController.createReview);

router
  .route('/clinic')
  .get(reviewController.getAllClinicReviews)
  .post(serviceController.setClinicId, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
