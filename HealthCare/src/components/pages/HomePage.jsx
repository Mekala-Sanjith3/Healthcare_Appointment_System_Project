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
            {[
              {
                icon: "fas fa-user-shield",
                title: "Admin Login",
                description: "Manage the healthcare system, staff, and services with ease.",
              },
              {
                icon: "fas fa-user-md",
                title: "Doctor Login",
                description: "View appointments, manage schedules, and access patient records.",
              },
              {
                icon: "fas fa-user",
                title: "Patient Login",
                description: "Book appointments, access reports, and consult with doctors.",
              },
            ].map((type, index) => (
              <div className="login-card" key={index}>
                <i className={type.icon}></i>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <button className="btn-login">Log In as {type.title.split(" ")[0]}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <p>Explore the range of services we offer to make healthcare simple and accessible for you.</p>
          <div className="services-grid">
            {[
              {
                icon: "fas fa-stethoscope",
                title: "Telemedicine",
                description: "Access consultations from home.",
              },
              {
                icon: "fas fa-calendar-check",
                title: "Appointment Scheduling",
                description: "Manage your appointments effortlessly.",
              },
              {
                icon: "fas fa-notes-medical",
                title: "Medical Records",
                description: "Securely store and access your history.",
              },
              {
                icon: "fas fa-hospital",
                title: "In-Clinic Visits",
                description: "Organize your in-person consultations easily.",
              },
              {
                icon: "fas fa-ambulance",
                title: "Emergency Services",
                description: "Quick response for urgent needs.",
              },
              {
                icon: "fas fa-heartbeat",
                title: "Health Monitoring",
                description: "Track your vitals and improve your health.",
              },
              {
                icon: "fas fa-pills",
                title: "Pharmacy Services",
                description: "Order and track medicines online.",
              },
              {
                icon: "fas fa-dna",
                title: "Lab Tests",
                description: "Get diagnostic tests at your convenience.",
              },
              {
                icon: "fas fa-wheelchair",
                title: "Rehabilitation",
                description: "Support for recovery and wellness.",
              },
              {
                icon: "fas fa-user-nurse",
                title: "Nursing Services",
                description: "Professional care at your doorstep.",
              },
            ].map((service, index) => (
              <div className="service" key={index}>
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
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
