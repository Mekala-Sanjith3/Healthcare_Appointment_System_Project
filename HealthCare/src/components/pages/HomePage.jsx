import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/css-pages/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="heart-icon">❤</div>
            <span className="logo-health">Health</span>
            <span className="logo-care">Care</span>
          </div>
          <nav className="nav-links">
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <a href="#portal-section" className="login-btn">Login</a>
          </nav>
        </div>
      </header>

      <div className="home-container">
        {/* Main content starts here */}
        <main className="main-content">
          <h1>
            <span className="gradient-text">Your Health</span>, Our Priority
          </h1>
          <p className="subtitle">
            <span className="gradient-text">Advanced Healthcare Solutions</span> for a Better Tomorrow
          </p>
          <p className="description">
            Experience world-class healthcare services with cutting-edge technology and compassionate
            care from our team of expert medical professionals.
          </p>
          <div className="button-group">
            <button className="btn explore">EXPLORE SERVICES</button>
            <button className="btn book">Book Appointment</button>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-text">Expert Doctors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-text">Happy Patients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-text">Years Experience</span>
            </div>
          </div>
        </main>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Expert Doctors</h3>
              <p>World-class healthcare professionals with years of experience in their specialties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-laptop-medical"></i>
              </div>
              <h3>Advanced Technology</h3>
              <p>State-of-the-art medical equipment and innovative treatment solutions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-ambulance"></i>
              </div>
              <h3>24/7 Emergency Care</h3>
              <p>Round-the-clock emergency services with rapid response teams</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-flask"></i>
              </div>
              <h3>Modern Laboratories</h3>
              <p>Advanced diagnostic facilities with precise and quick results</p>
            </div>
          </div>
        </section>

        {/* Healthcare Portal Section */}
        <section id="portal-section" className="portal-section">
          <h2>Access Your Healthcare Portal</h2>
          <div className="portal-cards">
            <div className="portal-card">
              <h3>Patient Portal</h3>
              <ul>
                <li>View Medical Records</li>
                <li>Schedule Appointments</li>
                <li>Message Your Doctor</li>
                <li>Access Lab Results</li>
              </ul>
              <button className="portal-btn">Login</button>
            </div>
            <div className="portal-card">
              <h3>Doctor Portal</h3>
              <ul>
                <li>Access Patient Records</li>
                <li>Manage Schedule</li>
                <li>View Lab Results</li>
                <li>Telemedicine Console</li>
              </ul>
              <button className="portal-btn" onClick={() => navigate('/doctor-login')}>Login</button>
            </div>
            <div className="portal-card">
              <h3>Admin Portal</h3>
              <ul>
                <li>System Management</li>
                <li>User Administration</li>
                <li>Analytics Dashboard</li>
                <li>Resource Planning</li>
              </ul>
              <button className="portal-btn" onClick={() => navigate('/admin-login')}>Login</button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <div className="container">
            <h2 className="section-title">Patient Testimonials</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="quote"><i className="fas fa-quote-left"></i></div>
                <p>Outstanding medical care and professional staff. The doctors are highly knowledgeable++ and caring.</p>
                <div className="author">- Pavan</div>
              </div>
              <div className="testimonial-card">
                <div className="quote"><i className="fas fa-quote-left"></i></div>
                <p>The online appointment system is so convenient. I can manage my healthcare needs efficiently.</p>
                <div className="author">- Sanjith</div>
              </div>
              <div className="testimonial-card">
                <div className="quote"><i className="fas fa-quote-left"></i></div>
                <p>Excellent facilities and prompt service. The staff is always ready to help with a smile.</p>
                <div className="author">- Vamsee Krishna</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-info">
                <div className="footer-logo">
                  <i className="fas fa-heartbeat"></i> HealthCare
                </div>
                <p>Providing Quality Healthcare Services</p>
                <div className="social-links">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <div className="footer-links">
                <h3>Quick Links</h3>
                <a href="#about">About Us</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy Policy</a>
              </div>
              <div className="footer-contact">
                <h3>Contact Us</h3>
                <p><i className="fas fa-phone"></i> +91 100-100-100-100</p>
                <p><i className="fas fa-envelope"></i> info@healthcare.com</p>
                <p><i className="fas fa-map-marker-alt"></i>12 - Medical Center, Guntur City</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 HealthCare System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
