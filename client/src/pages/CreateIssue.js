import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electrical',
    location: '',
    urgency: 'Medium'
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/issues', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting issue');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2>Report Campus Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Title</label>
            <input 
              type="text" 
              placeholder="e.g., Broken Light in Lab 201"
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="IT Support">IT Support</option>
              <option value="Hostel">Hostel</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location / Room / Block</label>
            <input 
              type="text" 
              placeholder="e.g., Main Library - 2nd Floor"
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Urgency Level</label>
            <select 
              value={formData.urgency} 
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              rows="4" 
              placeholder="Describe the problem in detail..."
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              required 
            />
          </div>
          <button className="btn" type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;