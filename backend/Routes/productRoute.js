const upload = require('/home/asma/ecommerce-parfum/backend/multerConfiguration')//
const express = require("express");
const productRouter = express.Router();
 //Correct path to multer configuration
const productController = require("../Controllers/productController");

// Route to create a product with image upload
productRouter.post("/products", upload.single("file"), productController.postProduct);

module.exports = productRouter;