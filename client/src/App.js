import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReportIssue from './components/ReportIssue';
import IssuesTracking from './components/IssuesTracking';
import ApiInspector from './components/ApiInspector';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showApiModal, setShowApiModal] = useState(false);

  return (
    <Router>
      <div className="app-layout">
{user && <Sidebar onOpenApiModal={() => setShowApiModal(true)} user={user} onLogout={() => setUser(null)} />}        
        <main className="main-content">
          {user && (
            <header className="top-banner">
              <span>CAMPUS SYSTEM • ONLINE</span>
              <span className="semester-tag">Semester Fall 2026</span>
              <button className="btn-api-preview" onClick={() => setShowApiModal(true)}>
                ⚙ API Output Preview
              </button>
            </header>
          )}

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={(userData) => setUser(userData)} />} />
            
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/register" replace />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/register" replace />} />
            <Route path="/report" element={user ? <ReportIssue /> : <Navigate to="/register" replace />} />
            <Route path="/tracking" element={user ? <IssuesTracking /> : <Navigate to="/register" replace />} />
            <Route path="/api-inspector" element={user ? <ApiInspector /> : <Navigate to="/register" replace />} />
            <Route path="/profile" element={user ? <Profile user={user} onLogout={() => setUser(null)} /> : <Navigate to="/register" replace />} />
          </Routes>
        </main>

        {showApiModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <span>http://localhost:5000/api/issues</span>
                <button onClick={() => setShowApiModal(false)}>Close X</button>
              </div>
              <pre className="json-box">
{`{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64ddbc061aacce17fbb8dae1",
      "title": "Poor sanitation in washrooms",
      "category": "Sanitation",
      "status": "pending",
      "priority": "High"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;