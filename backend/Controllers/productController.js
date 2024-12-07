const Product = require("../models/Product");

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
      image: req.file.path,  // Make sure you're using the correct file path
    });

    // Save the product to the database
    await product.save();
    res.status(201).json(product);  // Return the created product
  } catch (error) {
    console.error('Error while creating product:', error);
    res.status(500).json({ message: 'Error while creating product' });
  }
};

module.exports = {
  postProduct,
};