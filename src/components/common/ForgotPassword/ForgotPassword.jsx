import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } catch (err) {
      setError('Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    } catch (err) {
      setError('Invalid reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(4);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target.className === 'modal-overlay') {
        onClose();
      }
    }}>
      <div className="forgot-password-portal">
        <div className="forgot-wrapper">
          <div className="forgot-left">
            <div className="welcome-content">
              <i className="fas fa-lock-open logo-icon"></i>
              <h1>Password Recovery</h1>
              <p>Reset your password in a few simple steps</p>
            </div>
            
            <div className="features">
              <div className="feature-item">
                <i className="fas fa-envelope"></i>
                <span>Email Verification</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Reset Process</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-key"></i>
                <span>Create New Password</span>
              </div>
            </div>
          </div>

          <div className="forgot-right">
            <div className="forgot-box">
              <div className="forgot-header">
                <h2>Reset Your Password</h2>
                <p>Step {step} of 4</p>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              {step === 1 && (
                <form onSubmit={handleRequestReset} className="forgot-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-envelope"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your registered email"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Reset Code
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="forgot-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-key"></i>
                      Reset Code
                    </label>
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      required
                      placeholder="Enter the code sent to your email"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i>
                        Verify Code
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleResetPassword} className="forgot-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-lock"></i>
                      New Password
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          checkPasswordStrength(e.target.value);
                        }}
                        required
                        placeholder="Create new password"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[...Array(4)].map((_, index) => (
                          <div
                            key={index}
                            className={`strength-bar ${index < passwordStrength ? 'active' : ''}`}
                          ></div>
                        ))}
                      </div>
                      <span>Password Strength: {
                        passwordStrength === 0 ? 'Weak' :
                        passwordStrength === 1 ? 'Fair' :
                        passwordStrength === 2 ? 'Good' :
                        passwordStrength === 3 ? 'Strong' :
                        'Very Strong'
                      }</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-lock"></i>
                      Confirm New Password
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check-double"></i>
                        Reset Password
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <h3>Password Reset Successful!</h3>
                  <p>Your password has been successfully updated. You can now log in with your new password.</p>
                  <button 
                    className="submit-button"
                    onClick={onClose}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    Return to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword; 