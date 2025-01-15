// backend/routes/productRoutes.js

const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { isAuthenticated, isBusinessOwner } = require('../middleware/auth');

const router = express.Router();

router.post('/', isAuthenticated, isBusinessOwner, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', isAuthenticated, isBusinessOwner, updateProduct);
router.delete('/:id', isAuthenticated, isBusinessOwner, deleteProduct);

module.exports = router;
