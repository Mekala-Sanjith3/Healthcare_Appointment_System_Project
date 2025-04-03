import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { patientService } from '../../../services/api';
import ITSupportPortal from "../../common/ITSupport/ITSupportPortal";
import "../../../styles/pages/patient/PatientLogin.css";

const PatientLogin = () => {
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
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await patientService.login(credentials);
      console.log('Login successful:', response.data);
      
      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.patient));
      
      toast.success('Login successful!');
      navigate('/patient/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="welcome-content">
            <i className="fas fa-user-injured logo-icon"></i>
            <h1>Welcome Back, Patient</h1>
            <p>Access your healthcare portal to manage appointments and medical records</p>
          </div>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-calendar-check"></i>
              <span>Book Appointments</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-file-medical"></i>
              <span>View Medical Records</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-comments"></i>
              <span>Consult with Doctors</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>Patient Login</h2>
              <p>Please enter your credentials</p>
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
                    Login to Portal
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>New to our healthcare system?</p>
              <div className="footer-actions">
                <button 
                  className="support-link"
                  onClick={() => setShowSupportPortal(true)}
                >
                  <i className="fas fa-headset"></i>
                  Need Help?
                </button>
                <button 
                  className="register-link"
                  onClick={() => navigate('/patient/register')}
                >
                  <i className="fas fa-user-plus"></i>
                  Register Now
                </button>
              </div>
            </div>

            <div className="security-note">
              <i className="fas fa-shield-alt"></i>
              <p>Secure login protected by industry standard encryption</p>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button 
                className="close-button"
                onClick={() => setShowForgotPassword(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Enter your email address and we'll send you a link to reset your password.</p>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="modal-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowForgotPassword(false)}
              >
                Cancel
              </button>
              <button className="submit-button">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {showSupportPortal && (
        <div className="modal-overlay">
          <ITSupportPortal onClose={() => setShowSupportPortal(false)} />
        </div>
      )}
    </div>
  );
};

export default PatientLogin; 