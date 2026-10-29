import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    major: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    setSuccess('Registration successful! Redirecting to login...');
    setError('');
    
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <h2>CampusPulse</h2>
          <p>Create your student account</p>
        </div>

        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">{success}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>FULL NAME</label>
            <input 
              type="text" 
              name="name"
              placeholder="Alex Rivera" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>STUDENT EMAIL</label>
            <input 
              type="email" 
              name="email"
              placeholder="alex.rivera@campus.edu" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>STUDENT ID</label>
              <input 
                type="text" 
                name="studentId"
                placeholder="0212-99018" 
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MAJOR</label>
              <input 
                type="text" 
                name="major"
                placeholder="Computer Science" 
                value={formData.major}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn-primary-full">
            Register Account
          </button>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;