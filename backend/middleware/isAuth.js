const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded token (user info) to request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token expired" });
    } else {
      res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = isAuth;
