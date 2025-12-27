const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (for assignee selection)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('name email _id').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

