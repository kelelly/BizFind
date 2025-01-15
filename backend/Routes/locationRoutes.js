// backend/routes/locationRoutes.js

const express = require('express');
const router = express.Router();
const {
  getBusinessesNearLocation,
  updateBusinessLocation,
  getGeocodeData
} = require('../controllers/locationController');
const { isAuthenticated } = require('../middleware/auth'); // Importing the session-based auth middleware

// Route to get businesses near a specific location
router.get('/nearby', getBusinessesNearLocation);

// Route to update the location of a business (requires authentication)
router.put('/:businessId/location', isAuthenticated, updateBusinessLocation);

// Route to get geocode data from HERE Maps API
router.get('/geocode', getGeocodeData);

module.exports = router;
