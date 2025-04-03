import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button/button";
import { Input } from "../../common/Input/input";
import ForgotPassword from "../../common/ForgotPassword/ForgotPassword";
import "../../../styles/pages/patient/PatientLogin.css";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8080/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('patientData', JSON.stringify(data.patient));

      // Navigate to dashboard
      navigate('/patient-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="welcome-content">
            <i className="fas fa-user-circle logo-icon"></i>
            <h1>Welcome Back</h1>
            <p>Access your healthcare portal for personalized care</p>
          </div>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-calendar-plus"></i>
              <span>Book Appointments</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-video"></i>
              <span>Telemedicine Services</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-robot"></i>
              <span>AI Doctor Recommendations</span>
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
                    Login
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>New patient?</p>
              <button 
                className="register-link"
                onClick={() => navigate('/patient-register')}
              >
                <i className="fas fa-user-plus"></i>
                Register Now
              </button>
            </div>

            <div className="security-note">
              <i className="fas fa-shield-alt"></i>
              <p>Your health information is protected by industry standard encryption</p>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default PatientLogin; 