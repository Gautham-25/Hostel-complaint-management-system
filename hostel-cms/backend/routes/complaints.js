const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
} = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/', protect, adminOnly, getAllComplaints);
router.put('/:id', protect, adminOnly, updateComplaint);
router.delete('/:id', protect, adminOnly, deleteComplaint);

module.exports = router;
