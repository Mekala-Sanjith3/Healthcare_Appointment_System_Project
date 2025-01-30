import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/css-pages/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    navigate('/doctor-login');
  };

  return (
    <>
      <header className="hero-header">
        <div className="container">
          <div className="logo">
            <i className="fa fa-heartbeat"></i>
            <span className="highlight">Health</span>Care
          </div>
          <nav className="navbar">
            <a href="#about"><i className="fa fa-info-circle"></i> About Us</a>
            <a href="#services"><i className="fa fa-briefcase-medical"></i> Our Services</a>
            <a href="#contact"><i className="fa fa-envelope"></i> Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Healthcare System</h1>
          <p>We provide tailored solutions for administrators, doctors, and patients to make healthcare accessible and efficient.</p>
          <a href="#services" className="btn-primary">Join Us</a>
        </div>
      </section>

      <section className="login-section">
        <div className="container">
          <h2>Login to Your Portal</h2>
          <p>Access specialized features by logging into your respective portal.</p>
          <div className="login-cards">
            <div className="login-card">
              <i className="fas fa-user-shield"></i>
              <h3>Admin Login</h3>
              <p>Manage the healthcare system, staff, and services with ease.</p>
              <button className="btn-login">Log In as Admin</button>
            </div>
            <div className="login-card">
              <i className="fas fa-user-md"></i>
              <h3>Doctor Login</h3>
              <p>View appointments, manage schedules, and access patient records.</p>
              <button className="btn-login" onClick={handleDoctorLogin}>Log In as Doctor</button>
            </div>
            <div className="login-card">
              <i className="fas fa-user"></i>
              <h3>Patient Login</h3>
              <p>Book appointments, access reports, and consult with doctors.</p>
              <button className="btn-login">Log In as Patient</button>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        {/* ... rest of your services section code ... */}
      </section>

      <footer className="footer">
        {/* ... rest of your footer code ... */}
      </footer>
    </>
  );
};

export default HomePage;
