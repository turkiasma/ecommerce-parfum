const Product = require("../models/Product");

// Function to create a new product
const postProduct = async (req, res) => {
  try {
    const { name, price, size, scent, description, promotion, stock } = req.body;

    // Ensure that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create a new product with the uploaded image
    const product = new Product({
      name,
      price,
      size,
      scent,
      description,
      promotion,
      stock,
      image: req.file.path.replace(/\\/g, "/")  // Normalize path  // Make sure you're using the correct file path
    });

    // Save the product to the database
    await product.save();
    res.status(201).json(product);  // Return the created product
  } catch (error) {
    console.error('Error while creating product:', error);
    res.status(500).json({ message: 'Error while creating product' });
  }
};

// Function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);  // Return the products as a JSON response
  } catch (error) {
    console.error('Error while fetching products:', error);
    res.status(500).json({ message: 'Error while fetching products' });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;  // Get the product ID from the URL parameters

    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });  // If product not found
    }

    res.status(200).json({ message: 'Product deleted successfully', product });  // Return success message
  } catch (error) {
    console.error('Error while deleting product:', error);
    res.status(500).json({ message: 'Error while deleting product' });
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  deleteProduct,
};