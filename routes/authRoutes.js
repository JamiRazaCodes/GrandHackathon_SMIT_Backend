const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const { body, validationResult } = require("express-validator");
// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, cnic, password } = req.body;

  console.log('Received data:', req.body); // Log the incoming request data

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      cnic,
      generatedPassword: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user data
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        cnic: newUser.cnic,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
      console.log("login complete")
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
