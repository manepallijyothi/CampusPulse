const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const auth = require('../middleware/auth');

// Create a new Issue
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, location, urgency } = req.body;

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      urgency,
      reportedBy: req.user.userId
    });

    const issue = await newIssue.save();
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all issues (Students see theirs, Admin sees all)
router.get('/', auth, async (req, res) => {
  try {
    let issues;
    if (req.user.role === 'admin') {
      issues = await Issue.find().populate('reportedBy', 'name email').sort({ createdAt: -1 });
    } else {
      issues = await Issue.find({ reportedBy: req.user.userId }).sort({ createdAt: -1 });
    }
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update issue status (Admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(430).json({ message: 'Access denied. Admin only.' });
    }

    const { status } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete issue (Owner or Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    if (issue.reportedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await issue.deleteOne();
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;