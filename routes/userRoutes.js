const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
//we access :token by req.params.token

router.use(authController.protect);
//krejt routes ca vin pas ksaj perdorin 'authController.protect' dmth ske pse e shkrun 100 her

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getOneUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)

router
  .route('/:id/:x?')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
