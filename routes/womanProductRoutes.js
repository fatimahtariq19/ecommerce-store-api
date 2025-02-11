const express = require('express');
const {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductImage, 
} = require("../controllers/womanProductController.js");

const router = express.Router();

// Routes
router.post("/add", addProduct);
router.get("/", getAllProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/image/:id", getProductImage);

module.exports = router; 
