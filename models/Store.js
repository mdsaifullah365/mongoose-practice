const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a store name'],
      trim: true,
      lowercase: true,
      enum: {
        values: ['dhaka', 'chattogram', 'cox bazar', 'barishal', 'khulna'],
        message: '{VALUE} is not a valid store name',
      },
    },

    description: String,

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    manager: {
      name: String,
      contactNumber: ObjectId,
      id: {
        type: ObjectId,
        ref: 'User',
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

exports = Store;
