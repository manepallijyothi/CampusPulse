import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <h2>CampusPulse</h2>
        <p>Student Portal &amp; Support</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          📝 Report an issue
        </NavLink>
        <NavLink to="/tracking" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          📋 Issues &amp; Tracking
        </NavLink>
        <NavLink to="/api-inspector" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          💻 Backend API Inspector
        </NavLink>
      </nav>

      {/* User profile & Logout button at bottom */}
      <div className="sidebar-footer">
        <div className="user-profile-section" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar-sm">{user?.name ? user.name[0] : 'AR'}</div>
          <div className="user-info-sm">
            <strong>{user?.name || 'Alex Rivera'}</strong>
            <span>ID: {user?.id || '0212-99018'}</span>
          </div>
        </div>
        <button onClick={onLogout} className="btn-logout" title="Logout">
          🚪
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;