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
      const postUser = await User.findById(savedPost.userId);
      res.status(200).json({ ...savedPost.toObject(), profilePic: postUser?.profilePic });
    } catch (err) {
      console.error("Error saving post:", err);
      res.status(500).json(err);
    }
  };

  // If a file is attached (for example, using multer or express-fileupload)
  if (req.files && req.files.file) {
    const uid = req.body.userId;
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    const mFileName = `${uid}_post_${Date.now()}${fileExt}`;  // using template literal
    const movePath = path.join(__dirname, "..", "uploads", mFileName);
    file.mv(movePath, (err) => {
      if (err) {
        console.error("File upload error:", err);
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
    // Compare string values by converting ObjectId to string if necessary
    if (post.userId.toString() === req.body.userId) {
      await Post.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can update only your Posts");
    }
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json(err);
  }
});

// Delete a post
postRouter.delete("/:id/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.params.userId) {
      await Post.deleteOne({ _id: req.params.id });
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("You can delete only your Posts");
    }
  } catch (err) {
    console.error("Error deleting post:", err);
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
    console.error("Error updating likes:", err);
    res.status(500).json(err);
  }
});

// Comment on a post (with debugging)
postRouter.put("/addcomment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("Before adding comment, current comments:", post.comments);
    if (!req.body.userId || !req.body.comment) {
      return res.status(400).json({ error: "Missing comment userId or comment" });
    }
    await post.updateOne({ $push: { comments: req.body } });
    console.log("Added comment:", req.body);
    res.status(200).json("Comment Posted!");
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json(err);
  }
});

// Get a post by id (with debugging in comment processing)
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const postUser = await User.findById(post.userId);

    // Process each comment to include firstname and lastname
    const updatedComments = await Promise.all(
      post.comments.map(async (comment) => {
        const commentUser = await User.findById(comment.userId);
        return {
          ...comment.toObject(),
          firstname: commentUser?.firstname || "Unknown",
          lastname: commentUser?.lastname || "User",
          profilePic: commentUser?.profilePic || null,
        };
      })
    );

    // Return the post with user details
    res.status(200).json({
      ...post.toObject(),
      profilePic: postUser?.profilePic || null,
      firstname: postUser?.firstname || "Unknown",
      lastname: postUser?.lastname || "User",
      comments: updatedComments,
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json(err);
  }
});


// Get the feed: current user posts + contacts' posts
postRouter.get("/feed/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    const contactPosts = await Promise.all(
      user.contacts.map((contactId) => Post.find({ userId: contactId }))
    );

    const allPosts = userPosts.concat(...contactPosts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Add `firstname` and `lastname` to posts and comments
    const postsWithUserDetails = await Promise.all(
      allPosts.map(async (post) => {
        const postUser = await User.findById(post.userId);
        const updatedComments = await Promise.all(
          post.comments.map(async (comment) => {
            const commentUser = await User.findById(comment.userId);
            return {
              ...comment.toObject(),
              firstname: commentUser?.firstname || "Unknown",
              lastname: commentUser?.lastname || "User",
              profilePic: commentUser?.profilePic || null,
            };
          })
        );
        return {
          ...post.toObject(),
          firstname: postUser?.firstname || "Unknown",
          lastname: postUser?.lastname || "User",
          profilePic: postUser?.profilePic || null,
          comments: updatedComments,
        };
      })
    );

    res.status(200).json(postsWithUserDetails);
  } catch (err) {
    console.error("Error fetching feed:", err);
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
    console.error("Error fetching timeline:", err);
    res.status(500).json(err);
  }
});

module.exports = postRouter;
