const express = require('express');
const { body, validationResult } = require('express-validator');
const WorkOrder = require('../models/WorkOrder');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/workorders
// @desc    Get all work orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate('equipmentCategory', 'name')
      .populate('assignee', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    res.json(workOrders);
  } catch (error) {
    console.error('Get work orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/workorders/:id
// @desc    Get single work order
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id)
      .populate('equipmentCategory', 'name')
      .populate('assignee', 'name email')
      .populate('createdBy', 'name');
    
    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }
    
    res.json(workOrder);
  } catch (error) {
    console.error('Get work order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/workorders
// @desc    Create new work order
// @access  Private
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('equipmentCategory').notEmpty().withMessage('Equipment category is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('maintenanceType').notEmpty().withMessage('Maintenance type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Generate work order number
    const count = await WorkOrder.countDocuments();
    const workOrderNumber = `WO-${String(count + 1).padStart(6, '0')}`;

    const workOrderData = {
      ...req.body,
      workOrderNumber,
      createdBy: req.user._id
    };

    const workOrder = new WorkOrder(workOrderData);
    await workOrder.save();
    
    const populated = await WorkOrder.findById(workOrder._id)
      .populate('equipmentCategory', 'name')
      .populate('assignee', 'name email')
      .populate('createdBy', 'name');

    res.status(201).json(populated);
  } catch (error) {
    console.error('Create work order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/workorders/:id
// @desc    Update work order
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('equipmentCategory', 'name')
      .populate('assignee', 'name email')
      .populate('createdBy', 'name');

    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.json(workOrder);
  } catch (error) {
    console.error('Update work order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/workorders/:id
// @desc    Delete work order
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workOrder = await WorkOrder.findByIdAndDelete(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.json({ message: 'Work order deleted successfully' });
  } catch (error) {
    console.error('Delete work order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

