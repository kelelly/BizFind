// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerBusiness,
  login,
  requestPasswordReset,
  resetPassword
} = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth'); // Importing the middleware

// Public routes (no authentication required)
router.post('/register/user', registerUser);
router.post('/register/business', registerBusiness);
router.post('/login', login);

// Routes that could require authentication depending on your app's security policies
router.post('/password-reset/request', requestPasswordReset); // Typically, this doesn't require auth
router.post('/password-reset/reset', resetPassword); // Ensure the reset token is validated in the controller

module.exports = router;
