const express = require('express');
const viewController = require('../controllers/viewController');
const offerController = require('../controllers/offerController');
const clinicController = require('../controllers/clinicController');
const tripController = require('../controllers/tripController');
const clinicRouter = require('./clinicRoutes');
const hotelRouter = require('./hotelRoutes');
const tripRouter = require('./tripRoutes');
const offerRouter = require('./offerRoutes');
const reviewRouter = require('./reviewRoutes');
const bookRouter = require('./bookRoutes');
const serviceRouter = require('./serviceRoutes');

const router = express.Router();

router.use('/home', viewController.getHome);
router.use('/trips', viewController.getAllTrips);
router.use('/trips:id', tripController.getOneTrip);

router.use('/clinics', viewController.getAllClinics);
router.use('/clinics:id', clinicController.getOneClinic);

router.use('/offers', offerController.getAllOffers);
router.use('/offers:id', offerController.getOneOffer);

router.use('/api/clinics', clinicRouter);
router.use('/api/hotels', hotelRouter);
router.use('/api/trips', tripRouter);
router.use('/api/reviews', reviewRouter)
router.use('/api/offers', offerRouter)
router.use('/api/book', bookRouter)
router.use('/api/services', serviceRouter)


module.exports = router;