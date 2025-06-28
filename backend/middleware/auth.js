// backend/middleware/auth.js

const jwt = require("jsonwebtoken");
const Business = require("../models/Business");

/**
 * Middleware to verify JWT and attach user info to the request object.
 */
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting format: 'Bearer <token>'

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token." });
    }
    req.user = decoded; // Attach decoded token payload to request
    next();
  });
};
/**
 * Middleware to check if the user has the required role.
 * @param {string} role - The required role (e.g., 'admin').
 */
exports.hasRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Forbidden: Insufficient privileges." });
  };
};

/**
 * Middleware to check if the authenticated user is the owner of the business.
 */
exports.isBusinessOwner = async (req, res, next) => {
  try {
    const businessId = req.params.id || req.params.businessId;
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: "Business not found." });
    }

    if (business.ownerId.toString() === req.user.id) {
      return next();
    } else {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to perform this action.",
      });
    }
  } catch (error) {
    console.error(`Error checking business ownership: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};
