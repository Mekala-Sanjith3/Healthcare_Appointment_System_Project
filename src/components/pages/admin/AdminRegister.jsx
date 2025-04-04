import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../../services/api';
import "../../../styles/pages/admin/AdminRegister.css";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    adminCode: '', // Special code for admin registration
    department: '',
    role: 'ADMIN'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate admin code
    if (formData.adminCode !== 'ADMIN123') { // This should be more secure in production
      toast.error('Invalid admin registration code');
      return;
    }

    try {
      const response = await authService.registerAdmin({
        ...formData,
        userType: 'ADMIN'
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        toast.success('Admin registration successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Admin Registration</h2>
          <p>Create new administrator account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT Administration</option>
              <option value="OPERATIONS">Operations</option>
              <option value="FINANCE">Finance</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="adminCode">Admin Registration Code</label>
            <input
              type="password"
              id="adminCode"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">Register as Admin</button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <span onClick={() => navigate('/admin/login')} className="login-link">Login here</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister; 