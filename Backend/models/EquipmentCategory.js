const mongoose = require('mongoose');

const equipmentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EquipmentCategory', equipmentCategorySchema);

