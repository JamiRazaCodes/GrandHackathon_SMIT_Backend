const express = require("express");
const { createPost, getUserPosts } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getUserPosts);

module.exports = router;
