// backend/routes/reviewRoutes.js
const express = require('express');
const {
  addReview,
  getReviewsForBusiness,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Review routes
router.post('/business/:businessId', isAuthenticated, addReview);
router.get('/business/:businessId', getReviewsForBusiness);
router.get('/:id', getReviewById);
router.put('/:id', isAuthenticated, updateReview);
router.delete('/:id', isAuthenticated, deleteReview);

module.exports = router;
