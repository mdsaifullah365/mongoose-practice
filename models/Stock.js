const mongoose = require('mongoose');
const validator = require('validator');
p;
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      unique: [true, 'Product name must be unique'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [100, "Name can't be larger than 100 characters"],
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, 'Please provide product description'],
      trim: true,
    },

    unit: {
      type: String,
      required: [true, 'Please provide product unit'],
      enum: {
        values: ['kg', 'litre', 'pcs', 'bags'],
        message: "Unit can't be {VALUE}. Unit must be kg/litre/pcs/bags",
      },
    },

    imageURLs: [
      {
        type: String,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }

            let isValid;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: 'Please provide valid image urls',
        },
      },
    ],

    price: {
      type: Number,
      min: [0, "Product price can't be negative"],
      required: true,
    },

    quantity: {
      type: Number,
      min: [0, "Product quantity can't be negative"],
      required: true,
      validate: {
        validator: (value) => {
          return Number.isInteger(value);
        },
        message: 'Product quantity must be an integer',
      },
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: 'Brand',
        required: true,
      },
    },

    status: {
      type: String,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "Status can't be {VALUE}",
      },
    },

    store: {
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
      id: {
        type: ObjectId,
        ref: 'Store',
        required: true,
      },
    },

    supplier: {
      name: {
        type: String,
        required: [true, 'Please provide a supplier name'],
      },
      id: {
        type: ObjectId,
        ref: 'Supplier',
        required: true,
      },
    },
  },
  {
    timestamps: true,
    // _id: false,
  }
);

const Stock = mongoose.model('Stock', stockSchema);

exports = Stock;
