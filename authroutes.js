
// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Your user model

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user
    const user = new User({ username, email, password });
    await user.save();
    // Generate a JWT token
    const token = jwt.sign({ user: user._id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Verify the password
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ user: user._id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
