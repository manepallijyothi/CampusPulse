import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>🏫 CampusPulse</h2>
      <div>
        {user ? (
          <>
            <span>Welcome, <strong>{user.name}</strong> ({user.role})</span>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'student' && <Link to="/create-issue">Report Issue</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;