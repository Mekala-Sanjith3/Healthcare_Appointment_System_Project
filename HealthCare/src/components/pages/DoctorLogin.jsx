import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/css-pages/DoctorLogin.css";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here later
    navigate('/doctor-dashboard');
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-box">
        <div className="login-header">
          <i className="fas fa-user-md"></i>
          <h2>Doctor Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
