const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Books',
          'Electronics',
          'Calculators',
          'Lab Equipment',
          'Furniture',
          'Stationery',
          'Other',
        ],
        message: '{VALUE} is not a supported category',
      },
    },
    condition: {
      type: String,
      required: [true, 'Item condition is required'],
      enum: {
        values: ['New', 'Like New', 'Good', 'Fair'],
        message: '{VALUE} is not a valid condition',
      },
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    campus: {
      type: String,
      required: [true, 'Campus or location is required'],
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for text/search performance
listingSchema.index({ title: 'text', category: 1 });

module.exports = mongoose.model('Listing', listingSchema);
