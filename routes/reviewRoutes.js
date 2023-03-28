const express = require('express');
const reviewController = require('./../controllers/reviewController');
const serviceController = require('./../controllers/serviceController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/trip')
  .get(reviewController.getAllTripReviews)
  .post(reviewController.setTripUserId, reviewController.createReview);

router
  .route('/clinic')
  .get(reviewController.getAllClinicReviews)
  .post(serviceController.setClinicUserId, reviewController.createReview);

// router
//   .route('/offer:id')
//   .get(reviewController.getAllOfferReviews)
//   .post(serviceController.setClinicUserId, reviewController.setTripUserId, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
