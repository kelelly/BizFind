// backend/routes/businessRoutes.js

const express = require("express");
const {
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  addProduct,
  getBusinessProducts,
} = require("../controllers/businessController");
const {
  isAuthenticated,
  isBusinessOwner,
  hasRole,
} = require("../middleware/auth");

const router = express.Router();

// ── Public ────────────────────────────────────────────────────
router.get("/", getAllBusinesses); // List/filter all businesses
router.get("/:id", getBusinessById); // Get single business
router.get("/:businessId/products", getBusinessProducts); // Public product list

// ── Protected ─────────────────────────────────────────────────
router.use(isAuthenticated); // All below require valid JWT

router.post(
  "/:businessId/products",
  isBusinessOwner, // Only owner may add
  addProduct
);

router.put(
  "/:id",
  isBusinessOwner, // Only owner may update
  updateBusiness
);

router.delete(
  "/:id",
  hasRole("admin"), // Only admins may delete
  deleteBusiness
);

module.exports = router;
