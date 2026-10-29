import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sanitation',
    priority: 'High - Urgent Attention',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, status: 'pending' })
    }).catch(() => {});
    navigate('/dashboard');
  };

  return (
    <div className="screen-container">
      <div className="form-wrapper">
        <p className="form-tag">STUDENT SUBMISSION PORTAL</p>
        <h2>Report an issue</h2>
        <p className="form-sub">Please describe in detail. Your ticket will be dispatched to the maintenance department.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ISSUE TITLE *</label>
            <input 
              type="text" 
              placeholder="e.g., Poor sanitation in washrooms" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CATEGORY</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Sanitation">Sanitation</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Academics">Academics</option>
              </select>
            </div>
            <div className="form-group">
              <label>PRIORITY LEVEL</label>
              <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="High - Urgent Attention">High - Urgent Attention</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>DETAILED DESCRIPTION *</label>
            <textarea 
              rows="4" 
              placeholder="Provide exact location, full number, or context regarding the issue..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn-primary">Submit Issue Report</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;