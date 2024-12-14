const upload = require("../multerConfiguration");
const express = require("express");
const productRouter = express.Router();
 //Correct path to multer configuration
const productController = require("../Controllers/productController");

// Route to create a product with image upload
productRouter.get("/products", productController.getAllProducts);
productRouter.post("/products", upload.single("file"), productController.postProduct);

// Route to delete a product by ID
productRouter.delete("/products/:id", productController.deleteProduct);

module.exports = productRouter;
