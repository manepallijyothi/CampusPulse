import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation demo check
    if (email && password) {
      onLogin({ name: 'Alex Rivera', email: email, id: '0212-99018' });
      navigate('/dashboard');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <h2>CampusPulse</h2>
          <p>Student Portal &amp; Support</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>STUDENT EMAIL</label>
            <input 
              type="email" 
              placeholder="alex.rivera@campus.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary-full">
            Sign In to Portal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;