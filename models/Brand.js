const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a brand name'],
      trim: true,
      unique: [true, 'Brand name must be unique'],
      maxLength: [100, "Brand name can't be larger than 100 characters"],
      lowercase: true,
    },
    description: String,
    location: String,
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address'],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid website URL'],
    },
    products: [
      {
        id: ObjectId,
        ref: 'Product',
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: 'Supplier',
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);

exports = Brand;
