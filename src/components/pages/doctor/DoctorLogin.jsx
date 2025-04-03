import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button/button";
import { Input } from "../../common/Input/input";
import ITSupportPortal from "../../common/ITSupport/ITSupportPortal";
import ForgotPassword from "../../common/ForgotPassword/ForgotPassword";
import "../../../styles/pages/doctor/DoctorLogin.css";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSupportPortal, setShowSupportPortal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/doctor-dashboard');
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="welcome-content">
            <i className="fas fa-heartbeat logo-icon"></i>
            <h1>Welcome Back, Doctor</h1>
            <p>Access your dashboard to manage appointments and patient care</p>
          </div>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-calendar-check"></i>
              <span>Manage Appointments</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-user-injured"></i>
              <span>Patient Records</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-notes-medical"></i>
              <span>Medical History</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>Doctor Login</h2>
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
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
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
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
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
              <p>Need technical support?</p>
              <div className="footer-actions">
                <button 
                  className="support-link"
                  onClick={() => setShowSupportPortal(true)}
                >
                  <i className="fas fa-headset"></i>
                  Contact IT Support
                </button>
                <button 
                  className="register-link"
                  onClick={() => navigate('/patient-register', { 
                    state: { 
                      userType: 'doctor',
                      title: 'Doctor Registration'
                    }
                  })}
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

export default DoctorLogin;