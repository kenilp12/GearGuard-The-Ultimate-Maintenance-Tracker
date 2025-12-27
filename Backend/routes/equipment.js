const express = require('express');
const { body, validationResult } = require('express-validator');
const EquipmentCategory = require('../models/EquipmentCategory');
const ComponentCategory = require('../models/ComponentCategory');
const auth = require('../middleware/auth');
const router = express.Router();

// Equipment Categories Routes

// @route   GET /api/equipment/categories
// @desc    Get all equipment categories
// @access  Private
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await EquipmentCategory.find()
      .populate('responsible', 'name email')
      .sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get equipment categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/equipment/categories
// @desc    Create equipment category
// @access  Private
router.post('/categories', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('company').notEmpty().withMessage('Company is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new EquipmentCategory(req.body);
    await category.save();
    
    const populated = await EquipmentCategory.findById(category._id)
      .populate('responsible', 'name email');

    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    console.error('Create equipment category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/equipment/categories/:id
// @desc    Update equipment category
// @access  Private
router.put('/categories/:id', auth, async (req, res) => {
  try {
    const category = await EquipmentCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('responsible', 'name email');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Update equipment category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/equipment/categories/:id
// @desc    Delete equipment category
// @access  Private
router.delete('/categories/:id', auth, async (req, res) => {
  try {
    const category = await EquipmentCategory.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete equipment category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Component Categories Routes

// @route   GET /api/equipment/component-categories
// @desc    Get all component categories
// @access  Private
router.get('/component-categories', auth, async (req, res) => {
  try {
    const categories = await ComponentCategory.find()
      .populate('responsible', 'name email')
      .sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get component categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/equipment/component-categories
// @desc    Create component category
// @access  Private
router.post('/component-categories', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('company').notEmpty().withMessage('Company is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new ComponentCategory(req.body);
    await category.save();
    
    const populated = await ComponentCategory.findById(category._id)
      .populate('responsible', 'name email');

    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    console.error('Create component category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/equipment/component-categories/:id
// @desc    Update component category
// @access  Private
router.put('/component-categories/:id', auth, async (req, res) => {
  try {
    const category = await ComponentCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('responsible', 'name email');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Update component category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/equipment/component-categories/:id
// @desc    Delete component category
// @access  Private
router.delete('/component-categories/:id', auth, async (req, res) => {
  try {
    const category = await ComponentCategory.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete component category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

