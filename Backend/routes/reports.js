const express = require('express');
const WorkOrder = require('../models/WorkOrder');
const Task = require('../models/Task');
const EquipmentCategory = require('../models/EquipmentCategory');
const ComponentCategory = require('../models/ComponentCategory');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/reports/maintenance-schedule
// @desc    Get maintenance schedule report
// @access  Private
router.get('/maintenance-schedule', auth, async (req, res) => {
  try {
    const { startDate, endDate, company, status } = req.query;
    
    const query = {};
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }
    if (company) query.company = company;
    if (status) query.status = status;

    const workOrders = await WorkOrder.find(query)
      .populate('equipmentCategory', 'name')
      .populate('assignee', 'name email')
      .sort({ dueDate: 1 });

    res.json(workOrders);
  } catch (error) {
    console.error('Get maintenance schedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/summary
// @desc    Get summary statistics
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const totalWorkOrders = await WorkOrder.countDocuments();
    const pendingWorkOrders = await WorkOrder.countDocuments({ status: 'Pending' });
    const inProgressWorkOrders = await WorkOrder.countDocuments({ status: 'In Progress' });
    const completedWorkOrders = await WorkOrder.countDocuments({ status: 'Completed' });
    
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });
    
    const totalEquipmentCategories = await EquipmentCategory.countDocuments();
    const totalComponentCategories = await ComponentCategory.countDocuments();

    res.json({
      workOrders: {
        total: totalWorkOrders,
        pending: pendingWorkOrders,
        inProgress: inProgressWorkOrders,
        completed: completedWorkOrders
      },
      tasks: {
        total: totalTasks,
        pending: pendingTasks
      },
      categories: {
        equipment: totalEquipmentCategories,
        component: totalComponentCategories
      }
    });
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

