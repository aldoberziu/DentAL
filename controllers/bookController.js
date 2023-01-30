const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('./../utils/catchAsync');
const Trip = require('./../models/tripModel');
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1) get tour from tourid
  const trip = await Trip.findById(req.params.tripId);
  //2)  create session
  const session = await stripe.checkout.sessions.create({
    payment_method_type: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${trip.name}`,
          },
          unit_amount: trip.price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/trip/${trip.slug}`,
    // customer_email: req.user.email,
    client_reference_id: req.params.tripId,
  });
  //3) send session
  res.status(200).json({
    status: 'success',
    session,
  });
  next();
});

//duhet me bo tour.pug edhe login.js pr me perfundu stripen
