
const WomanProduct = require ("../models/WomanProduct.js");
const mongoose = require ("mongoose");
const { gfs } = require ("../middleware/upload.js");

const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, images, stock } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const newProduct = new WomanProduct({
      name,
      price,
      category,
      description,
      images,
      stock,
    });

   
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error); 

    res.status(500).json({
      message: "Error adding product",
      error: error.message, 
    });
  }
};


  const getAllProducts = async (req, res) => {
    try {
      const products = await WomanProduct.find().sort({ category: 1 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  };

 const getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      const validCategories = ["RTW", "Unstitched", "WEST", "Sleepover", "Modest"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category!" });
      }
  
      const products = await WomanProduct.find({ category });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found in this category" });
      }
  
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Error fetching products by category", error: error.message });
    }
  };
  


 const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID!" });
      }
  
 
      const product = await WomanProduct.findById(id);
  

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
  
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Error fetching product", error: error.message });
    }
  };
  


 const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, images, stock } = req.body;

    const updatedProduct = await WomanProduct.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, images, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found!" });

    res.json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};



const getProductImage = async (req, res) => {
    try {
      const file = await gfs.find({ _id: new mongoose.Types.ObjectId(req.params.id) }).toArray();
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "No image found" });
      }
  
      gfs.openDownloadStream(new mongoose.Types.ObjectId(req.params.id)).pipe(res);
    } catch (error) {
      res.status(500).json({ message: "Error fetching image", error });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const product = await WomanProduct.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found!" });
  
      // Delete image = require GridFS
      await gfs.delete(new mongoose.Types.ObjectId(product.imageId));
  
      await WomanProduct.findByIdAndDelete(req.params.id);
      res.json({ message: "Product and image deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  };
  

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductImage
};

