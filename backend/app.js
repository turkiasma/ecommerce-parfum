const express = require("express");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const bagRoute = require("./Routes/bagRoute");
const orderRoute=require("./Routes/orderRoute")
const connectDb = require('./Configuration/connectDb');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors

dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDb();

// Use CORS middleware
app.use(cors({
  origin: "https://parfumn-aura-5x6k.onrender.com", // Allow requests from the frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true // Allow cookies to be sent
}));

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON requests
app.use(express.json());

// Routes

app.use("/api", userRoute);
// Serve uploaded files statically


// Use product routes
app.use("/api", productRoute);
app.use("/api/bag", bagRoute);// Updated to prefix bag routes with /api/bag
app.use("/api/order",orderRoute );

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`Server is running on port ${port}`);
  }
});