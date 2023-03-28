const express = require('express');
const emailController = require('./../controllers/emailController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(emailController.getAllEmails)
  .post(emailController.setEmailUserId, emailController.createEmail);

router.use(authController.restrictTo('admin'));
router
  .route('/:id')
  .get(emailController.getOneEmail)
  .delete(emailController.deleteEmail);

module.exports = router;