const mongoose = require('mongoose');
const validator = require('validator');
p;
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    // _id: false,
  }
);

const Product = mongoose.model('Product', productSchema);

exports = Product;
