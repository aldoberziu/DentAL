const mongoose = require('mongoose');
const Trip = require('./../models/tripModel');
const Clinic = require('./../models/clinicModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Review must have a rating!'],
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    offer: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ trip: 1, user: 1 }, { unique: true });
reviewSchema.index({ clinic: 1, user: 1 }, { unique: true });

//POPULATION///////////////////////////////////////////////////////////////////////////
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'trip',
    select: 'name slug',
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'clinic',
    select: 'name slug',
  });
  next();
});
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
      rating: stats[0].avgRating,
    });
  } else {
    await Trip.findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      rating: 1,
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
//////////////////////////////////////////////////////////////////////////////////
reviewSchema.statics.calcAverageRatingClinic = async function (clinicId) {
  const stats = await this.aggregate([
    {
      $match: { clinic: clinicId },
    },
    {
      $group: {
        _id: '$clinic',
        nrRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Clinic.findByIdAndUpdate(clinicId, {
      ratingsQuantity: stats[0].nrRating,
      rating: stats[0].avgRating,
    });
  } else {
    await Clinic.findByIdAndUpdate(clinicId, {
      ratingsQuantity: 0,
      rating: 1,
    });
  }
};
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatingClinic(this.clinic);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRatingClinic(this.review.clinic);
});
////////////////////////////////////////////////////////////////////////////////////

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
