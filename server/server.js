const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://24501a4432_db_user:Campus12345@cluster0.vxwq7mi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const issueSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  priority: String,
  status: { type: String, default: 'pending' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json({ success: true, count: issues.length, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/issues', async (req, res) => {
  try {
    const newIssue = await Issue.create(req.body);
    res.status(201).json({ success: true, data: newIssue });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));