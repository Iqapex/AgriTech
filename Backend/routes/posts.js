const express = require("express");
const postRouter = express.Router();
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");

// Create a post
postRouter.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const savePost = async () => {
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // If a file is attached (for example, using multer or express-fileupload)
  if (req.files && req.files.file) {
    const uid = req.body.userId;
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    const mFileName = `${uid}_post_${Date.now()}${fileExt}`;
    const movePath = path.join(__dirname, "..", "uploads", mFileName);
    file.mv(movePath, (err) => {
      if (err) {
        console.log("File upload error: " + err);
        return res.status(500).json({ error: "File upload failed" });
      } else {
        newPost.fileName = mFileName;
        savePost();
      }
    });
  } else {
    savePost();
  }
});

// Update a post
postRouter.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can update only your Posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
postRouter.delete("/:id/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.params.userId) {
      await Post.deleteOne({ _id: req.params.id });
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("You can delete only your Posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like / dislike a post
postRouter.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("UnLiked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Comment on a post
postRouter.put("/addcomment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("Comment Posted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post by id
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the feed: current user posts + contacts' posts
postRouter.get("/feed/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // Get posts created by the current user
    const userPosts = await Post.find({ userId: user._id });
    // Get posts by contacts (assume user.contacts is an array of user IDs)
    const contactPosts = await Promise.all(
      user.contacts.map((contactId) => Post.find({ userId: contactId }))
    );
    res.status(200).json(userPosts.concat(...contactPosts).sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Timeline: only current user's posts
postRouter.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postRouter;
