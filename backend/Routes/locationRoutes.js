const express = require("express");
const {
  getBusinessesNearLocation,
  updateBusinessLocation,
  getGeocodeData,
} = require("../controllers/locationController");
const { isAuthenticated, isBusinessOwner } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/nearby", getBusinessesNearLocation); // Find nearby businesses by geo-coordinates
router.get("/geocode", getGeocodeData); // Retrieve geocode information from HERE Maps API

// Apply JWT authentication to all routes below
router.use(isAuthenticated);

// Protected route: only the owner of the business may update its location
router.put("/:businessId/location", isBusinessOwner, updateBusinessLocation);

module.exports = router;
