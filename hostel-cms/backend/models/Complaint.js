const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    category: {
      type: String,
      enum: ['Plumbing', 'Electrical', 'Wi-Fi', 'Furniture', 'Cleanliness', 'Other'],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
    adminRemark: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
