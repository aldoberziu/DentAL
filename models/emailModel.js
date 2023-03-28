const mongoose = require('mongoose');
const validator = require('validator');

const emailSchema = new mongoose.Schema(
  {
    phoneNumber:{
        type:Number,
    },
    contacterEmail:{
      type: String,
      required: [true, 'Please provide us your email!'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    purpose: {
      type: String
    },
    subject:{
        type:String
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Email must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//mbush review model me t dhenat e userit perkates
emailSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
