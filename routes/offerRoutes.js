const express = require('express');
const offerController = require('./../controllers/offerController');

const router = express.Router();

router
  .route('/')
  .get(offerController.getAllOffers)

router.route('/:id').get(offerController.getOneOffer);

module.exports = router;
