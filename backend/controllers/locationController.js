// backend/controllers/locationController.js

const Business = require("../models/Business");
const fetch = require("node-fetch");

// Get businesses near a location
const getBusinessesNearLocation = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const maxDistanceInMeters = maxDistance ? parseFloat(maxDistance) : 10000; // default to 10 km

    const businesses = await Business.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
    });

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add or update a business location
const updateBusinessLocation = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    // Find the business by ID
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Check if the authenticated user is the owner of the business
    if (business.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message:
            "You do not have permission to update this business location",
        });
    }

    // Update the business location
    business.location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
    await business.save();

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get geocode data from HERE Maps API using fetch
const getGeocodeData = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const params = new URLSearchParams({
      q: address,
      apiKey: process.env.HERE_API_KEY,
    });

    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?${params.toString()}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch geocode data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch geocode data", error });
  }
};

module.exports = {
  getBusinessesNearLocation,
  updateBusinessLocation,
  getGeocodeData,
};
