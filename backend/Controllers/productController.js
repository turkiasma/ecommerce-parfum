const Product = require("../models/Product");

const postProduct = async (req, res) => {
  try {
    const { name, price, size, scent, description, promotion, stock, image } = req.body;

    // Ensure that an image URL is provided
    if (!image) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // Create a new product with the provided image URL
    const product = new Product({
      name,
      price,
      size,
      scent,
      description,
      promotion,
      stock,
      image  // Use 'image' instead of 'imageUrl'
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
    const products = await Product.find();  // Fetch all products
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

// Function to update a product
const putProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the URL parameters
    const { name, price, size, scent, description, promotion, stock, image } = req.body; // Get the updated product details from the body

    // Check if the image URL is provided
    if (!image) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // Find the product by ID and update it with the new values
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, size, scent, description, promotion, stock, image },
      { new: true } // Ensure the updated product is returned
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // If the product is not found
    }

    res.status(200).json(product); // Return the updated product
  } catch (error) {
    console.error('Error while updating product:', error);
    res.status(500).json({ message: 'Error while updating product' });
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  deleteProduct,
  putProduct, 
};
