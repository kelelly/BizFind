// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // Trims whitespace from both ends of the string
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures the email is stored in lowercase
    trim: true // Trims whitespace from both ends of the string
  },
  password: {
    type: String,
    required: true,
    select: false // Prevents the password from being returned in queries by default
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
