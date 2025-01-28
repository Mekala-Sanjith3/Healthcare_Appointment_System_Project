import React from "react";
import "../../styles/css-pages/HomePage.css";

const HomePage = () => {
  return (
    <>
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Healthcare System</h1>
          <p>We provide tailored solutions for administrators, doctors, and patients to make healthcare accessible and efficient.</p>
          <a href="#services" className="btn-primary">Join Us</a>
        </div>
      </section>

      {/* Login Section */}
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
              <button className="btn-login">Log In as Doctor</button>
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

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <p>Explore the range of services we offer to make healthcare simple and accessible for you.</p>
          <div className="services-grid">
            <div className="service">
              <i className="fas fa-stethoscope"></i>
              <h3>Telemedicine</h3>
              <p>Access consultations from home.</p>
            </div>
            <div className="service">
              <i className="fas fa-calendar-check"></i>
              <h3>Appointment Scheduling</h3>
              <p>Manage your appointments effortlessly.</p>
            </div>
            <div className="service">
              <i className="fas fa-notes-medical"></i>
              <h3>Medical Records</h3>
              <p>Securely store and access your history.</p>
            </div>
            <div className="service">
              <i className="fas fa-hospital"></i>
              <h3>In-Clinic Visits</h3>
              <p>Organize your in-person consultations easily.</p>
            </div>
            <div className="service">
              <i className="fas fa-ambulance"></i>
              <h3>Emergency Services</h3>
              <p>Quick response for urgent needs.</p>
            </div>
            <div className="service">
              <i className="fas fa-heartbeat"></i>
              <h3>Health Monitoring</h3>
              <p>Track your vitals and improve your health.</p>
            </div>
            <div className="service">
              <i className="fas fa-user-nurse"></i>
              <h3>Nursing Support</h3>
              <p>Get professional care at your convenience.</p>
            </div>
            <div className="service">
              <i className="fas fa-prescription"></i>
              <h3>Pharmacy Access</h3>
              <p>Order and refill prescriptions online.</p>
            </div>
            <div className="service">
              <i className="fas fa-headset"></i>
              <h3>24/7 Support</h3>
              <p>Reach out anytime for assistance.</p>
            </div>
            <div className="service">
              <i className="fas fa-diagnoses"></i>
              <h3>Diagnostic Services</h3>
              <p>Access lab results and diagnostics.</p>
            </div>
            <div className="service">
              <i className="fas fa-brain"></i>
              <h3>Mental Health Care</h3>
              <p>Professional counseling and mental wellness support.</p>
            </div>
            <div className="service">
              <i className="fas fa-wheelchair"></i>
              <h3>Rehabilitation Services</h3>
              <p>Comprehensive physical therapy and rehabilitation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <i className="fas fa-heartbeat"></i> HealthCare
            </div>
            <p>Your partner in ensuring a healthy future for everyone.</p>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </div>
            <p>&copy; 2025 HealthCare System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
