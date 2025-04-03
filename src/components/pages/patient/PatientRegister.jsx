import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/patient/PatientRegister.css";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // For multi-step form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phoneNumber || !formData.dateOfBirth || !formData.gender) {
      setError("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }

      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address
      };

      console.log('Sending data:', requestData); // Debug log

      const response = await fetch('http://localhost:8080/api/patients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('patientData', JSON.stringify(data.patient));
      navigate('/patient-dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <div className="register-left">
          <div className="welcome-content">
            <i className="fas fa-user-plus logo-icon"></i>
            <h1>Join Our Healthcare Platform</h1>
            <p>Create your account to access personalized healthcare services</p>
          </div>
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-calendar-check"></i>
              <span>Easy Appointment Booking</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-file-medical"></i>
              <span>Digital Health Records</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-comments"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="register-box">
            <div className="register-header">
              <h2>Patient Registration</h2>
              <p>Step {step} of 2</p>
            </div>

            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      <i className="fas fa-user"></i>
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i>
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fas fa-lock"></i>
                      Password*
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Create a password"
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

                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <i className="fas fa-lock"></i>
                      Confirm Password*
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      <i className="fas fa-phone"></i>
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">
                      <i className="fas fa-calendar"></i>
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">
                      <i className="fas fa-venus-mars"></i>
                      Gender*
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      <i className="fas fa-home"></i>
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {step === 2 && (
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(1)}
                  >
                    <i className="fas fa-arrow-left"></i>
                    Back
                  </button>
                )}
                <button
                  type="button"
                  className={`next-button ${isLoading ? 'loading' : ''}`}
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      {step === 1 ? (
                        <>
                          Next
                          <i className="fas fa-arrow-right"></i>
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <i className="fas fa-check"></i>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="register-footer">
              <p>Already have an account?</p>
              <button 
                className="login-link"
                onClick={() => navigate('/patient-login')}
              >
                <i className="fas fa-sign-in-alt"></i>
                Login Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;