import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IssuesTracking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Full ticket dataset shown in your video
  const [issues] = useState([
    { id: '#64ddbc', title: 'Poor sanitation in washrooms', desc: "The girl's waiting hall in 2nd floor in terms of sanitation is very poor.", category: 'Sanitation', priority: 'High', status: 'Pending', date: '10/25/2026' },
    { id: '#51fbad', title: 'Broken AC unit in Lecture Hall 35', desc: 'AC conditioner in making loud buzzing noise and not cooling the room.', category: 'Infrastructure', priority: 'Medium', status: 'Working', date: '10/25/2026' },
    { id: '#77eabc', title: 'Wi-Fi disconnections in Library 2nd floor', desc: 'Campus-wide Wi-Fi drops every 10 minutes in the silent study room.', category: 'Infrastructure', priority: 'High', status: 'Pending', date: '10/25/2026' },
    { id: '#92ccda', title: 'Course Portal Grade Discrepancy CS301', desc: 'Midterm grades for Assignment 2 are not reflecting updated scores.', category: 'Academics', priority: 'Low', status: 'Completed', date: '10/16/2026' },
    { id: '#118aef', title: 'Water Dispenser Leak in Hostel Block B', desc: 'Water leaking near room 204 creating slippery hazards in the hallway.', category: 'Hostel', priority: 'Medium', status: 'Pending', date: '10/25/2026' },
    { id: '#4392ab', title: 'Library Reserved Book Missing', desc: 'Database textbook reserved for exam prep is missing from section C.', category: 'Library', priority: 'Medium', status: 'Working', date: '10/27/2026' }
  ]);

  // Filter logic based on search and dropdowns
  const filteredIssues = issues.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Statuses' || item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="screen-container">
      {/* Top Filter Bar matching the video */}
      <div className="tracking-top-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search issue or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" 
          />
        </div>

        <div className="filter-group-right">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All Categories">All Categories</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Academics">Academics</option>
            <option value="Hostel">Hostel</option>
            <option value="Library">Library</option>
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Working">Working</option>
            <option value="Resolved">Resolved</option>
            <option value="Completed">Completed</option>
          </select>

          <button onClick={() => navigate('/report')} className="btn-primary-green">
            + New ticket
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>TICKET ID</th>
              <th>TITLE &amp; DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>REPORT DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((item, i) => (
                <tr key={i}>
                  <td><code className="ticket-id">{item.id}</code></td>
                  <td>
                    <div className="table-title">{item.title}</div>
                    <div className="table-desc">{item.desc}</div>
                  </td>
                  <td><span className="badge-cat">{item.category}</span></td>
                  <td><span className={`badge-priority ${item.priority.toLowerCase()}`}>{item.priority}</span></td>
                  <td><span className={`badge-status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td>{item.date}</td>
                  <td><button className="btn-action">👁</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">No matching issues found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssuesTracking;