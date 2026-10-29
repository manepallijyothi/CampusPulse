const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Electrical', 'Plumbing', 'IT Support', 'Hostel', 'Cleanliness', 'Other'], 
    required: true 
  },
  location: { type: String, required: true },
  urgency: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
  },
  status: { 
    type: String, 
    enum: ['Reported', 'In Progress', 'Resolved', 'Closed'], 
    default: 'Reported' 
  },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Issue', IssueSchema);