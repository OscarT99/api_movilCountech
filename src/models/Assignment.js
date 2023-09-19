const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reference: { type: mongoose.Schema.Types.ObjectId, ref: 'Reference', required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  unitsAssigned: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
