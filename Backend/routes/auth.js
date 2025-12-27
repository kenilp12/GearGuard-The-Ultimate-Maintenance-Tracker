const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';
    if (!userId) {
      throw new Error('User ID is required for token generation');
    }
    return jwt.sign({ userId: userId.toString() }, secret, {
      expiresIn: '30d'
    });
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    console.log('Signup request received:', { name: req.body.name, email: req.body.email });
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: errors.array()[0].msg || 'Validation error',
        errors: errors.array() 
      });
    }

    const { name, email, password } = req.body;
    console.log('Creating user with:', { name, email, passwordLength: password?.length });
    
    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    console.log('Creating new user...');
    const user = new User({ name, email, password });
    console.log('User object created, saving...');
    await user.save();
    console.log('User saved successfully:', user._id);

    // Generate token
    console.log('Generating token...');
    try {
      const token = generateToken(user._id.toString());
      console.log('Token generated');

      console.log('Sending success response');
      res.status(201).json({
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        }
      });
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      throw tokenError;
    }
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error stack:', error.stack);
    
    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' && error.message.includes('connection')) {
      return res.status(500).json({ 
        message: 'Database connection error. Please check if MongoDB is running.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    // Handle Mongoose errors
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return res.status(500).json({ 
        message: 'Database error. Please check MongoDB connection.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Return detailed error (always show message, full details in development)
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    
    res.status(500).json({ 
      message: error.message || 'Server error during signup',
      error: isDevelopment ? {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack
      } : undefined
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: errors.array()[0].msg || 'Validation error',
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

