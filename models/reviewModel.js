const mongoose = require('mongoose');
const Trip = require('./../models/tripModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    trip: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trip',
    },
    clinic: {
      type: mongoose.Schema.ObjectId,
      ref: 'Clinic',
    },
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//POPULATION///////////////////////////////////////////////////////////////////////////
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'trip',
    select: 'name',
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hotel',
    select: 'name',
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'clinic',
    select: 'name',
  });
  next();
});
/////////////////////////////////////////////////////////////////////////////////////

//CALCULATE AVERAGE RATING///////////////////////////////////////////////////////////
reviewSchema.statics.calcAverageRating = async function (tripId) {
  const stats = await this.aggregate([
    {
      $match: { trip: tripId },
    },
    {
      $group: {
        _id: '$trip',
        nrRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Trip.findByIdAndUpdate(tripId, {
      ratingsQuantity: stats[0].nrRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Trip.findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.trip);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRating(this.review.trip);
});
////////////////////////////////////////////////////////////////////////////////////

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
