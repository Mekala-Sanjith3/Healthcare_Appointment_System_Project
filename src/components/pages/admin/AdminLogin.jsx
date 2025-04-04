import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button/button";
import { Input } from "../../common/Input/input";
import ITSupportPortal from "../../common/ITSupport/ITSupportPortal";
import ForgotPassword from "../../common/ForgotPassword/ForgotPassword";
import { toast } from 'react-toastify';
import { authService } from '../../../services/api';
import "../../../styles/pages/admin/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSupportPortal, setShowSupportPortal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.loginAdmin(credentials);
      
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="welcome-content">
            <i className="fas fa-user-shield logo-icon"></i>
            <h1>Welcome Back, Admin</h1>
            <p>Access your dashboard to manage the healthcare system</p>
          </div>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-users-cog"></i>
              <span>Manage Users</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <span>System Analytics</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-robot"></i>
              <span>AI Management</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>Admin Login</h2>
              <p>Welcome back! Please login to your admin account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  Password
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <button 
                  type="button"
                  className="forgot-password"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Login to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>Need an admin account? <span onClick={() => navigate('/admin/register')} className="register-link">Register here</span></p>
              <div className="footer-actions">
                <button 
                  className="support-link"
                  onClick={() => setShowSupportPortal(true)}
                >
                  <i className="fas fa-headset"></i>
                  Contact IT Support
                </button>
              </div>
            </div>

            <div className="security-note">
              <i className="fas fa-shield-alt"></i>
              <p>Secure admin access protected by enhanced security measures</p>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}

      {showSupportPortal && (
        <div className="modal-overlay">
          <ITSupportPortal onClose={() => setShowSupportPortal(false)} />
        </div>
      )}
    </div>
  );
};

export default AdminLogin; 