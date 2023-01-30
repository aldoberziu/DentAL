const mongoose = require('mongoose');
const validator = require('validator');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: [30, 'A hotel name must have less than 30 characters'],
      min: [5, 'A hotel name must have more than 5 characters'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please provide a phone number!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a email!'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    //   photo: mongoose.ObjectId, =====>>> check schema documentation
    description: {
      type: String,
      required: [true, 'Please provide a description about the hotel'],
    },
    paymentDetails: {
      type: Object,
      default: {},
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: {
        type: String,
        required: [true, 'A hotel must have an address'],
      },
    },
  },
  {
    toJSON: { virtuals: true }, //this means that we want virtual properties part of the output
    toObject: { virtuals: true },
  }
);

hotelSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'hotel',
  localField: '_id',
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
