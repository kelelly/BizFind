const express = require("express");
const {
  addReview,
  getReviewsForBusiness,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/business/:businessId", getReviewsForBusiness); // List reviews for a business
router.get("/:id", getReviewById); // Get a single review

// Protected routes (require valid JWT)
router.use(isAuthenticated);
router.post("/business/:businessId", addReview); // Add a new review
router.put("/:id", updateReview); // Update an existing review
router.delete("/:id", deleteReview); // Delete a review

module.exports = router;
