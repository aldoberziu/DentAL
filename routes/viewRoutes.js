const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');
const clinicRouter = require('./clinicRoutes');
const tripRouter = require('./tripRoutes');
const reviewRouter = require('./reviewRoutes');
const bookRouter = require('./bookRoutes');
const serviceRouter = require('./serviceRoutes');
const userRouter = require('./userRoutes');
const emailRouter = require('./emailRoutes');

const router = express.Router();
router.use(authController.isLoggedIn);
router.get('/signup', viewController.getSignupForm)
router.get('/login', viewController.getLoginForm)
router.get('/logout', authController.logout)
router.get('/me', authController.protect, viewController.getAccount);

router.get('/home', viewController.getHome);

router.get('/trips', viewController.getAllTrips);
router.get('/trips-:slug', viewController.getOneTrip);

router.get('/clinics', viewController.getAllClinics);
router.get('/clinics-:slug', viewController.getOneClinic);

router.get('/offers', viewController.getAllOffers);
router.get('/offers-1', viewController.getOfferOne);
router.get('/offers-2', viewController.getOfferTwo);
router.get('/offers-3', viewController.getOfferThree);
router.get('/offers-4', viewController.getOfferFour);

router.use('/api/clinics', clinicRouter);
router.use('/api/trips', tripRouter);
router.use('/api/reviews', reviewRouter)
router.use('/api/email', emailRouter)
router.get('/api/offers', offerController.getAllOffers)
router.get('/api/offer-1', offerController.getOfferOne)
router.get('/api/offer-2', offerController.getOfferTwo)
router.get('/api/offer-3', offerController.getOfferThree)
router.get('/api/offer-4', offerController.getOfferFour)
router.get('/api/book', bookRouter)
router.get('/api/services', serviceRouter)
router.use('/api/users', userRouter)



module.exports = router;