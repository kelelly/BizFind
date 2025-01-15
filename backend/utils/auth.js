// backend/utils/auth.js
const bcrypt = require('bcrypt');

// Hash password utility
exports.hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password utility
exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

// Utility to get the session secret key from the environment
exports.getSessionSecret = () => {
  return process.env.SESSION_SECRET;
};
