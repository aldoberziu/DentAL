const express = require('express');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router.get('/checkout-session/tourId', bookController.getCheckoutSession)

module.exports = router;
