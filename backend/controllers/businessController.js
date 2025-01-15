// backend/controllers/businessController.js

const Business = require('../models/Business');
const Product = require('../models/Product');

// Get all businesses
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not retrieve businesses.', error });
  }
};

// Get business profile by ID
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not retrieve business.', error });
  }
};

// Update business details
const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    // Additional check for ownership if necessary (assuming middleware passed)
    if (req.session.userId !== business.ownerId.toString()) {
      return res.status(403).json({ message: 'You do not have permission to update this business.' });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not update business.', error });
  }
};

// Delete business account
const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    // Additional check for admin rights or ownership
    if (req.session.role !== 'admin' && req.session.userId !== business.ownerId.toString()) {
      return res.status(403).json({ message: 'You do not have permission to delete this business.' });
    }

    await Business.findByIdAndDelete(id);
    res.status(200).json({ message: 'Business deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not delete business.', error });
  }
};

// Add product to business
const addProduct = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: 'Business not found.' });
    }

    // Check if the user is the owner of the business
    if (req.session.userId !== business.ownerId.toString()) {
      return res.status(403).json({ message: 'You do not have permission to add a product to this business.' });
    }

    const product = new Product({ ...req.body, businessId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not add product.', error });
  }
};

// Get all products for a business
const getBusinessProducts = async (req, res) => {
  try {
    const { businessId } = req.params;
    const products = await Product.find({ businessId });
    if (!products) {
      return res.status(404).json({ message: 'No products found for this business.' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not retrieve products.', error });
  }
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  addProduct,
  getBusinessProducts,
};
