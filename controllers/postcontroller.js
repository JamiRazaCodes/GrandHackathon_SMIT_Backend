const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId; // From middleware
  try {
    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).send("Post created");
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getUserPosts = async (req, res) => {
  const userId = req.user.userId;
  try {
    const posts = await Post.find({ userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
