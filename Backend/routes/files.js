const express = require('express');
const filesRouter = express.Router();
const User = require('../models/User');
const File = require('../models/File');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage for general file uploads
const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // Using a function to set folder dynamically based on req.body.userId.
  params: async (req, file) => {
    const userId = req.body.userId || 'default';
    return {
      folder: `yourapp/${userId}`,
      allowedFormats: ["jpg", "png", "jpeg", "pdf", "mp4", "mov"],
    };
  },
});
const fileUpload = multer({ storage: fileStorage });

// Set up Cloudinary storage for profile picture uploads
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yourapp/profilePics',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});
const profilePicUpload = multer({ storage: profilePicStorage });

// GET all file objects (non-bin) for a user
filesRouter.post('/', async (req, res) => {
  try {
    console.log('Fetching files for user:', req.body.userId);
    const fileObjects = await File.find({ owner: req.body.userId, inBin: false });
    res.status(200).send(fileObjects);
  } catch (err) {
    console.error('Error fetching files:', err);
    res.status(500).json(err);
  }
});

// Redirects the client to the Cloudinary URL
filesRouter.get('/:userId/:storedName', async (req, res) => {
  try {
    const fileObj = await File.findOne({ storedName: req.params.storedName });
    if (!fileObj) {
      console.error('File not found with storedName:', req.params.storedName);
      return res.status(404).json({ error: "File not found" });
    }
    if (fileObj.owner === req.params.userId || (fileObj.sharedWith && fileObj.sharedWith.includes(req.params.userId))) {
      res.redirect(fileObj.url);
    } else {
      console.error('Unauthorized access for user:', req.params.userId);
      res.status(401).json({ error: "Cannot access this file!" });
    }
  } catch (err) {
    console.error('Error getting file:', err);
    res.status(500).json(err);
  }
});

// GET a file object using its _id (shared route)
filesRouter.get('/shared/:userId/:fileId', async (req, res) => {
  try {
    const fileObj = await File.findById(req.params.fileId);
    if (fileObj && (fileObj.owner === req.params.userId || (fileObj.sharedWith && fileObj.sharedWith.includes(req.params.userId)))) {
      res.status(200).json(fileObj);
    } else {
      console.error('Unauthorized or file not found in shared route');
      res.status(401).json({ error: "Cannot access this file!" });
    }
  } catch (err) {
    console.error('Error in shared route:', err);
    res.status(500).json({ error: 'Invalid' });
  }
});

// Upload a file using Cloudinary and multer
filesRouter.post('/fileUpload', fileUpload.single("file"), async (req, res) => {
  const userId = req.body.userId;
  console.log('File upload initiated for user:', userId);
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log('Multer file object:', req.file);
  
  // Create a new File document with details from multer/Cloudinary
  const newFile = new File({
    owner: userId,
    fileName: req.file.originalname,
    storedName: req.file.filename,  // Cloudinary public_id
    url: req.file.path,             // Secure URL from Cloudinary
    createdAt: new Date(),
    inBin: false,
  });
  
  try {
    const savedFile = await newFile.save();
    console.log('File saved to DB:', savedFile);
    res.status(200).json(savedFile);
  } catch (err) {
    console.error('Error saving file to DB:', err);
    res.status(500).json(err);
  }
});

// Get directory size (stubbed; implement via Cloudinary Admin API if needed)
filesRouter.post('/directorySize', async (req, res) => {
  res.status(200).json({ size: 0 });
});

// Update the shared list for a file
filesRouter.put('/shared/', async (req, res) => {
  try {
    const file = await File.findById(req.body.fileId);
    if (file.owner === req.body.userId) {
      await file.updateOne({ $set: { sharedWith: req.body.sharedWith } });
      res.status(200).json(file);
    } else {
      console.error('Unauthorized access to update shared list');
      res.status(401).json({ error: 'Unauthorized access' });
    }
  } catch (err) {
    console.error('Error updating shared list:', err);
    res.status(500).json(err);
  }
});


// Get files in bin
filesRouter.post('/bin', async (req, res) => {
  try {
    console.log('Fetching bin files for user:', req.body.userId);
    const fileObjects = await File.find({ owner: req.body.userId, inBin: true });
    res.status(200).send(fileObjects);
  } catch (err) {
    console.error('Error fetching bin files:', err);
    res.status(500).json(err);
  }
});

// "Delete" a file by moving it to the bin (update flag only)
filesRouter.post('/delete/:fileName', async (req, res) => {
  try {
    const file = await File.findOne({ storedName: req.params.fileName });
    if (file && file.owner === req.body.userId) {
      file.inBin = true;
      await file.save();
      console.log('File moved to bin:', file);
      res.status(200).json(file);
    } else {
      console.error('Unauthorized access or file not found for deletion');
      res.status(401).json({ error: "Unauthorized access" });
    }
  } catch (err) {
    console.error('Error moving file to bin:', err);
    res.status(500).json(err);
  }
});

// Restore a file from the bin
filesRouter.post('/bin/:fileName', async (req, res) => {
  try {
    const file = await File.findOne({ storedName: req.params.fileName });
    if (file && file.owner === req.body.userId) {
      file.inBin = false;
      await file.save();
      console.log('File restored from bin:', file);
      res.status(200).json(file);
    } else {
      console.error('Unauthorized access or file not found for restore');
      res.status(401).json({ error: "Unauthorized access" });
    }
  } catch (err) {
    console.error('Error restoring file from bin:', err);
    res.status(500).json(err);
  }
});

// Permanently delete a file from Cloudinary and the database
filesRouter.delete('/permanentDelete', async (req, res) => {
  try {
    const fileObj = await File.findById(req.body.fileId);
    if (fileObj && fileObj.owner === req.body.userId) {
      cloudinary.uploader.destroy(fileObj.storedName, async (error, result) => {
        if (error) {
          console.error('Cloudinary deletion error:', error);
          return res.status(500).json(error);
        }
        console.log('Cloudinary deletion result:', result);
        await fileObj.remove();
        console.log('File removed from DB');
        res.status(200).send('Deleted!');
      });
    } else {
      console.error('Unauthorized deletion attempt or file not found');
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error during permanent deletion:', err);
    res.status(500).json(err);
  }
});

// Upload a profile picture using Cloudinary and multer
filesRouter.post('/uploadProfilePic', profilePicUpload.single("file"), async (req, res) => {
  const userId = req.body.userId;
  console.log('Profile pic upload initiated for user:', userId);
  if (!req.file) {
    console.error('No profile pic file uploaded');
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log('Multer profile pic file:', req.file);
  const profilePic = req.file.path; // Cloudinary secure URL
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { profilePic } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('Profile pic updated for user:', updatedUser);
    res.status(200).json({ profilePic });
  } catch (err) {
    console.error('Error updating user profile pic:', err);
    res.status(500).json(err);
  }
});

// Get profile pic – simply redirect using the URL stored in the user record (if needed)
filesRouter.get('/get/profilePic/:fileName', async (req, res) => {
  try {
    const user = await User.findOne({ profilePic: req.params.fileName });
    if (user) {
      res.redirect(user.profilePic);
    } else {
      console.error('Profile pic not found for:', req.params.fileName);
      res.status(404).json({ error: 'Profile pic not found' });
    }
  } catch (err) {
    console.error('Error getting profile pic:', err);
    res.status(500).json(err);
  }
});

module.exports = filesRouter;
