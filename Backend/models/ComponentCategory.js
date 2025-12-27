const mongoose = require('mongoose');

const componentCategorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('ComponentCategory', componentCategorySchema);

