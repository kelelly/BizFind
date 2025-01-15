// backend/models/Business.js
const mongoose = require('mongoose');

// Define the schema for a Business
const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Business name is mandatory
  },
  address: {
    type: String,
    required: true, // Address is mandatory
  },
  phone: {
    type: String,
    required: true, // Phone number is mandatory
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Each business must have a unique email
  },
  password: {
    type: String,
    required: true, // Password is mandatory
    select: false, // Do not include password in queries by default
  },
  website: {
    type: String, // Website is optional
  },
  category: {
    type: String,
    required: true, // Business category is mandatory
    enum: ['Grocery Store', 'Supermarket', 'General Shop'], // Valid categories
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(value) {
          return value.length === 2 && 
                 value[0] >= -180 && value[0] <= 180 &&  // Longitude check
                 value[1] >= -90 && value[1] <= 90;      // Latitude check
        },
        message: 'Coordinates must be an array of two numbers: [longitude, latitude].',
      },
    },
  },
  operatingHours: {
    type: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
      open: { type: String, required: true }, // Opening time in 24-hour format (e.g., '09:00')
      close: { type: String, required: true } // Closing time in 24-hour format (e.g., '18:00')
    }],
    required: true, // Operating hours are mandatory
  },
  created_at: {
    type: Date,
    default: Date.now, // Default to current date and time
  },
  description: {
    type: String, // Description is optional
  }
});

BusinessSchema.index({ location: '2dsphere' });

// Export the Business model
module.exports = mongoose.model('Business', BusinessSchema);
