const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: [true, 'Name must be unique'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [100, "Name can't be larger than 100 characters"],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [5, 'Description must be at least 5 characters'],
      maxLength: [200, "Description can't be larger than 200 characters"],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: {
        values: ['kg', 'litre', 'pcs'],
        message: "Unit can't be {VALUE}. Unit must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          return Number.isInteger(value);
        },
        message: 'Quantity must be an integer',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "Status can't be {VALUE}",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Supplier',
    //   required: [true, 'Supplier is required'],
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // }
  },
  {
    timestamps: true,
    // _id: false,
  }
);

// Mongoose Middlewares
productSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  }
  next();
});

// productSchema.post('save', function (doc, next) {
//   console.log('Do something after saving');
//   next();
// });

// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
