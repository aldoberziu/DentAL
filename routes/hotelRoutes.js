const express = require('express');
const hotelController = require('./../controllers/hotelController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:hotelId/reviews', reviewRouter);

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(hotelController.createHotel);

router
  .route('/:id')
  .get(hotelController.getOneHotel)
  .patch(hotelController.updateHotel)
  .delete(hotelController.deleteHotel);

module.exports = router;
