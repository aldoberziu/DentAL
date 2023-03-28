const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A clinic must have a name!'],
      trim: true,
      max: [30, 'A clinic name must have less than 30 characters'],
      min: [5, 'A clinic name must have more than 5 characters'],
      select: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please provide a phone number!'],
      min: [10, 'The phone number must have more than 5 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a email!'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: [String],
    imageCover: String,
    description: {
      type: String,
      required: [true, 'Please provide a description about your clinic'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    slug: String,
    location: String,
  },
  {
    toJSON: { virtuals: true }, //this means that we want virtual properties part of the output
    toObject: { virtuals: true },
  }
);
clinicSchema.virtual('services', {
  ref: 'Service',
  foreignField: 'clinic',
  localField: '_id',
});
clinicSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'clinic',
  localField: '_id',
});

clinicSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
