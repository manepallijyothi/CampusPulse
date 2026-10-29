import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const { token, user } = useContext(AuthContext);

  const fetchIssues = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/issues', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/issues/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchIssues();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/issues/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchIssues();
    } catch (err) {
      alert('Failed to delete issue');
    }
  };

  return (
    <div className="container">
      <h2>Campus Issue Tracker Dashboard</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        {user?.role === 'admin' ? 'All Reported Campus Issues' : 'Your Submitted Issues'}
      </p>

      {issues.length === 0 ? (
        <div className="card"><p>No issues reported yet.</p></div>
      ) : (
        issues.map((issue) => (
          <div className="card" key={issue._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{issue.title}</h3>
              <span className={`badge badge-${issue.status.replace(' ', '-')}`}>
                {issue.status}
              </span>
            </div>

            <p style={{ margin: '10px 0' }}>{issue.description}</p>
            
            <p style={{ fontSize: '14px', color: '#555' }}>
              📍 <strong>Location:</strong> {issue.location} | 🏷️ <strong>Category:</strong> {issue.category} | ⚡ <strong>Urgency:</strong> <span className={`urgency-${issue.urgency}`}>{issue.urgency}</span>
            </p>

            {user?.role === 'admin' && issue.reportedBy && (
              <p style={{ fontSize: '13px', color: '#777', marginTop: '5px' }}>
                👤 Reported by: {issue.reportedBy.name} ({issue.reportedBy.email})
              </p>
            )}

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              {user?.role === 'admin' && (
                <div>
                  <label style={{ marginRight: '8px', fontSize: '14px' }}>Update Status: </label>
                  <select 
                    value={issue.status} 
                    onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '4px' }}
                  >
                    <option value="Reported">Reported</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              )}

              <button 
                onClick={() => handleDelete(issue._id)} 
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;