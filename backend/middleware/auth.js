// backend/middleware/auth.js
const Business = require('../models/Business');

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Please log in to access this resource.' });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    return next();
  } else {
    res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
  }
};

// Middleware to check if the user is the owner of the business
exports.isBusinessOwner = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id || req.params.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.ownerId.toString() === req.session.userId) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
  } catch (error) {
    console.error(`Error checking business ownership: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
