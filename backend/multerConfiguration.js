const multer = require("multer");
const path = require("path");

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // Name the file with timestamp + original extension
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;