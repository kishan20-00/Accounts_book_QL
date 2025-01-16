const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new user with default 'user' and 'request' values
    const newUser = new User({ 
      username, 
      email, 
      password,
      user: 'user', // Default role
      request: 'pending', // Default request status
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ 
      token, 
      user: { 
        id: newUser._id, 
        username, 
        email, 
        user: newUser.user, 
        request: newUser.request, 
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        user: user.user, 
        request: user.request, 
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get all users (GET request) after verifying JWT token and checking admin role
router.get('/users', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token and extract the user information
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    try {
      const loggedInUser = await User.findById(decoded.id); // Get the user from decoded token
      if (loggedInUser.user !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }

      // Fetch all users (excluding passwords)
      const users = await User.find({}, '-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
});

// Route to update the request status of a user (Admin only)
router.patch('/users/:id/request', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  const { id } = req.params; // User ID to update
  const { request } = req.body; // New request status

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token and check admin role
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    try {
      const loggedInUser = await User.findById(decoded.id);
      if (loggedInUser.user !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }

      // Update the user's request status
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { request },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User request status updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
});

module.exports = router;