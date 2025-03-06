const express = require("express");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
router.use("/uploads", express.static(uploadDir));

// Apply file upload middleware only for this route
router.use(fileUpload());

// Image Upload Route
router.post("/", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let file = req.files.file;
    let uploadPath = path.join(uploadDir, `${Date.now()}-${file.name}`);

    // Move file to the upload directory
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      // Return the file URL
      const fileUrl = `${process.env.CLIENT_URL || "http://localhost:5000"}/uploads/${path.basename(uploadPath)}`;
      res.json({ url: fileUrl });
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
