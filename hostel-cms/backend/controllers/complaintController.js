const Complaint = require('../models/Complaint');

// POST /api/complaints — student submits
const createComplaint = async (req, res) => {
  const { category, description, roomNumber } = req.body;
  try {
    const complaint = await Complaint.create({
      student: req.user._id,
      studentName: req.user.name,
      roomNumber: roomNumber || req.user.roomNumber,
      category,
      description,
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/complaints/my — student's own complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/complaints — admin gets all (optional ?status= filter)
const getAllComplaints = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/complaints/:id — admin updates
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    if (req.body.status) complaint.status = req.body.status;
    if (req.body.adminRemark !== undefined) complaint.adminRemark = req.body.adminRemark;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/complaints/:id — admin deletes
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createComplaint, getMyComplaints, getAllComplaints, updateComplaint, deleteComplaint };
