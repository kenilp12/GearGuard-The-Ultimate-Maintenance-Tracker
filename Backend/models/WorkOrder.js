const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  workOrderNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  equipmentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EquipmentCategory',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  usedBy: {
    type: String
  },
  maintenanceType: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedDate: {
    type: Date
  },
  description: {
    type: String
  },
  typeCost: {
    type: Number
  },
  employee: {
    type: String
  },
  startDate: {
    type: Date
  },
  usedInProject: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  dueDate: {
    type: Date
  },
  cost: {
    type: Number,
    default: 0
  },
  tag: {
    type: String
  },
  alternativeInformation: {
    type: String
  },
  costPerHour: {
    type: Number
  },
  capacityTaskUnits: {
    type: String
  },
  costTarget: {
    type: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkOrder', workOrderSchema);

