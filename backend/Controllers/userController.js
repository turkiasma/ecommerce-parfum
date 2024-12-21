const jwt = require("jsonwebtoken");
require("dotenv").config();
/*imported for jwt  */
const User = require("../models/User");

const bcrypt = require('bcryptjs');

const postUser = async (request, response) => {
  const user = request.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      response.status(400).json({ msg: "User already exists" });
    } else {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const newUser = new User(user);
      await newUser.save();
      response.status(200).json({ user: newUser, msg: "User successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on adding user" });
  }
};




/*sign inn */
const signIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(user.password, foundUser.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: foundUser._id, role: foundUser.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Set the cookie with the token
        res.cookie("authToken", token, {
          httpOnly: false,
          secure: true, // Use false for local testing (no HTTPS)
          sameSite:"None", // Prevent CSRF attacks
          maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
        });

        return res.status(200).json({ user: foundUser, token });
      } else {
        return res.status(400).json({ msg: "Wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "User not registered" });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: false,
  });
  res.status(200).json({ msg: "Logged out successfully" });
};

module.exports = {
  postUser,
  signIn,
  logout,
};