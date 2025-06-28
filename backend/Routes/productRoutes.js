const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticated, isBusinessOwner } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllProducts); // List all products
router.get("/:id", getProductById); // Get a single product

// Protected routes (require valid JWT)
router.use(isAuthenticated);

// Only the business owner may create, update, or delete products
router.post("/", isBusinessOwner, createProduct);
router.put("/:id", isBusinessOwner, updateProduct);
router.delete("/:id", isBusinessOwner, deleteProduct);

module.exports = router;
