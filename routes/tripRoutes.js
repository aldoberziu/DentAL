const express = require('express');
const tripController = require('./../controllers/tripController');
const reviewRouter = require('./../routes/reviewRoutes');
const bookRouter = require('./../routes/bookRoutes');

const router = express.Router();

router.use('/:tripId/reviews', reviewRouter);
router.use('/:tripId/book', bookRouter)

router
  .route('/')
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router
  .route('/best-trips')
  .get(tripController.bestTrips, tripController.getAllTrips);

router
  .route('/:id')
  .get(tripController.getOneTrip)
  .patch(tripController.updateTrip)
  .delete(tripController.deleteTrip);

module.exports = router;
