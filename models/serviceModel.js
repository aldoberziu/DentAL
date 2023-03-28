const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: [30, 'A service name must have less than 30 characters'],
      min: [5, 'A service name must have more than 5 characters'],
    },
    price: {
      type: Number,
      required: [true, 'A service must have a price!'],
    },
    discountedPrice: {
      type: Number,
      // validate: {
      //   validator: function (val) {
      //     return val < this.price;
      //   },
      //   message: 'Discounted price ({VALUE}) should be below the regular price',
      // },
    },
    description: {
      type: String,
      required: [true, 'Please provide a description about your service'],
    },
    clinic: {
      type: mongoose.Schema.ObjectId,
      ref: 'Clinic',
      required: [true, 'Service must belong to a clinic!'],
    },

    //   photo: mongoose.ObjectId, =====>>> check schema documentation
  },
  {
    toJSON: { virtuals: true }, //this means that we want virtual properties part of the output
    toObject: { virtuals: true },
  }
);

serviceSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'clinic',
    select: 'name',
  });
  next();
});
serviceSchema.pre('save', function (next) {
  this.discountedPrice = this.price - (this.price / 10)
  next();
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
