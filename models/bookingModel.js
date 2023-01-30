const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, 'Field is required!'],
      trim: true,
    },
    lName: {
      type: String,
      required: [true, 'Field is required!'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Field is required!'],
    },
    gender: {
      type: String,
      required: [true, 'Field is required!'],
    },
    email: {
      type: String,
      required: [true, 'Field is required!'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Field is required!'],
    },
    bookedAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    trip: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trip', //offer do e bejm m von ket
      required: [true, 'Booking must belong to a trip!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//mbush booking model me t dhenat e tripit perkates
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'trip',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
