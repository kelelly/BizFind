const express = require('express');
const {
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  addProduct,
  getBusinessProducts,
  getAllBusinesses,
} = require('../controllers/businessController');
const { isAuthenticated, isAdmin, isBusinessOwner } = require('../middleware/auth'); // Importing the middleware

const router = express.Router();

// Public route to get all businesses with optional filtering
router.get('/', async (req, res) => {
  try {
    const { location, category, reviews } = req.query;

    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (category) query.category = category;
    if (reviews) query.rating = { $gte: parseInt(reviews) };

    const businesses = await Business.find(query);
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not retrieve businesses.', error });
  }
});

// Routes that require authentication
router.get('/:id', isAuthenticated, getBusinessById);

// Update and delete routes with ownership and admin checks
router.put('/:id', isAuthenticated, isBusinessOwner, updateBusiness);
router.delete('/:id', isAuthenticated, isAdmin, deleteBusiness); // Only admins can delete businesses

// Product management routes with ownership check
router.post('/:businessId/products', isAuthenticated, isBusinessOwner, addProduct);
router.get('/:businessId/products', getBusinessProducts); // May not require authentication if products are public

module.exports = router;
