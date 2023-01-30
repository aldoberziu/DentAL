const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A trip must have a name!'],
      trim: true,
      min: [5, 'A trip name must have more than 5 characters!'],
    },
    description: {
      type: String,
      required: [true, 'A trip must have a description!'],
    },
    price: {
      type: Number,
      required: [true, 'A trip must have a price!'],
    },
    duration: {
      type: Number,
      required: [true, 'A trip must have a duration time (days)'],
    },
    distance: {
      type: Number,
      required: [true, 'A trip must have a distance (km)'],
    },
    photo: [Number],
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    imageCover: {
      type: String,
    },
    isAvailable: Boolean,
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: [true, 'A trip must have a start location!'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    stops: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        duration: Number,
        time: Date,
      },
    ],
    destination: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: [true, 'A trip must have a destination!'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    guides: [
      {
        type: String,
        required: [true, 'A trip must have a trip guide!'],
      },
    ],
  },
  {
    toJSON: { virtuals: true }, //this means that we want virtual properties part of the output
    toObject: { virtuals: true },
  }
);

//'reviews' is the name of the virtual field. vehet si dush
//foreignField is the name of the field in the other model (ReviewModel), dmth emri ku djathtas do afishohet e dhena
//localField is what content are we gonna send to the foreignField
tripSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'trip',
  localField: '_id',
});
tripSchema.virtual('booking', {
  ref: 'Booking',
  foreignField: 'trip',
  localField: '_id',
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;