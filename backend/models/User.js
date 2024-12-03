var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
  },
  password: {
    type: String,
    required: true, // Password is required for authentication
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Allowed roles
    default: 'user' // Default role
    },
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;