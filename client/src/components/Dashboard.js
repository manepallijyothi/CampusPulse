import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/issues')
      .then(res => res.json())
      .then(data => {
        if (data.success) setIssues(data.data);
      })
      .catch(() => {
        // Fallback demo data if backend isn't connected yet
        setIssues([
          { _id: '1', title: 'Poor sanitation in washrooms', category: 'Sanitation', priority: 'High', status: 'Pending', created: '2026-10-28' },
          { _id: '2', title: 'Broken AC unit in Lecture Hall 35', category: 'Infrastructure', priority: 'Medium', status: 'Working', created: '2026-10-28' },
          { _id: '3', title: 'Wi-Fi disconnections in Library 2nd floor', category: 'Infrastructure', priority: 'High', status: 'Pending', created: '2026-10-28' },
          { _id: '4', title: 'Course Portal Grade Discrepancy CS301', category: 'Academics', priority: 'Low', status: 'Completed', created: '2026-10-26' }
        ]);
      });
  }, []);

  return (
    <div className="screen-container">
      <div className="header-row">
        <div>
          <h1>Good day, Student!</h1>
          <p className="subtitle">Welcome to your CampusPulse portal. Track submitted campus issues or log new concerns.</p>
        </div>
        <button onClick={() => navigate('/report')} className="btn-primary">
          + Report an issue
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-box border-pending">
          <h2>2</h2>
          <p>Pending dispatch</p>
        </div>
        <div className="metric-box border-working">
          <h2>2</h2>
          <p>In progress by crew</p>
        </div>
        <div className="metric-box border-resolved">
          <h2>1</h2>
          <p>Ready for verification</p>
        </div>
        <div className="metric-box border-completed">
          <h2>4</h2>
          <p>Archived ticket</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Recent Campus Reports</h3>
          <span className="link-text" onClick={() => navigate('/tracking')}>View All Issues</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID &amp; DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>DATE REGISTERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.title}</strong></td>
                <td><span className="badge-cat">{item.category}</span></td>
                <td><span className={`badge-priority ${item.priority?.toLowerCase()}`}>{item.priority}</span></td>
                <td><span className={`badge-status ${item.status?.toLowerCase()}`}>{item.status}</span></td>
                <td>{item.created || '2026-10-28'}</td>
                <td><button className="btn-action">👁</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;