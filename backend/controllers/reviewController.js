// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Business = require('../models/Business');

// Add a new review for a business
exports.addReview = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // Assuming req.user is set by isAuthenticated middleware

    // Check if the business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Create and save the new review
    const newReview = new Review({ businessId, userId, rating, comment });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all reviews for a business
exports.getReviewsForBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const reviews = await Review.find({ businessId });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a specific review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const review = await Review.findByIdAndUpdate(id, updates, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
