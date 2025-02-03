import React, { useState } from "react";
import "../../styles/css-pages/DoctorDashboard.css";
import { Calendar, Clock, Users, FileText, Bell, Settings, LogOut, Brain, History } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "02:00 PM",
      type: "Consultation",
      status: "Confirmed",
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random"
    }
  ]);

  const notifications = [
    {
      id: 1,
      message: "New appointment request from Sarah Parker",
      time: "5 minutes ago",
      type: "appointment"
    },
    {
      id: 2,
      message: "Lab results ready for patient John Doe",
      time: "1 hour ago",
      type: "lab"
    }
  ];

  const [availability, setAvailability] = useState({
    monday: { start: "09:00", end: "17:00", isAvailable: true },
    tuesday: { start: "09:00", end: "17:00", isAvailable: true },
    wednesday: { start: "09:00", end: "17:00", isAvailable: true },
    thursday: { start: "09:00", end: "17:00", isAvailable: true },
    friday: { start: "09:00", end: "17:00", isAvailable: true }
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prevAvailability => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [field]: value
      }
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="content-card">
            <div className="card-header">
              <h2>Today's Appointments</h2>
              <button className="export-button">
                <i className="fas fa-download"></i>
                Export Schedule
              </button>
            </div>
            
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>
                        <div className="patient-info">
                          <img 
                            src={appointment.avatar} 
                            alt={appointment.patientName}
                            className="patient-avatar"
                          />
                          <span>{appointment.patientName}</span>
                        </div>
                      </td>
                      <td>{appointment.time}</td>
                      <td>{appointment.type}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <button className="view-details-btn">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'availability':
        return (
          <div className="content-card">
            <div className="card-header">
              <h2>Manage Availability</h2>
              <button className="ai-suggest-btn">
                <Brain className="nav-icon" />
                AI Suggestions
              </button>
            </div>
            <div className="availability-grid">
              {Object.entries(availability).map(([day, schedule]) => (
                <div key={day} className="availability-card">
                  <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  <div className="time-inputs">
                    <input 
                      type="time" 
                      value={schedule.start}
                      onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                    />
                    <span>to</span>
                    <input 
                      type="time" 
                      value={schedule.end}
                      onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                    />
                  </div>
                  <label className="availability-toggle">
                    <input
                      type="checkbox"
                      checked={schedule.isAvailable}
                      onChange={(e) => handleAvailabilityChange(day, 'isAvailable', e.target.checked)}
                    />
                    <span>Available</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'patient-history':
        return (
          <div className="content-card">
            <div className="card-header">
              <h2>Patient History</h2>
              <div className="search-bar">
                <input type="text" placeholder="Search patients..." />
              </div>
            </div>
            <div className="patient-history-list">
              {/* Patient history content */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <i className="fas fa-heartbeat"></i>
          <span>HealthCare</span>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => handleTabChange('appointments')}
          >
            <Calendar className="nav-icon" />
            <span>Appointments</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => handleTabChange('availability')}
          >
            <Clock className="nav-icon" />
            <span>Availability</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'patient-history' ? 'active' : ''}`}
            onClick={() => handleTabChange('patient-history')}
          >
            <History className="nav-icon" />
            <span>Patient History</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => handleTabChange('patients')}
          >
            <Users className="nav-icon" />
            <span>Patients</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => handleTabChange('schedule')}
          >
            <Clock className="nav-icon" />
            <span>Schedule</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabChange('reports')}
          >
            <FileText className="nav-icon" />
            <span>Reports</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings className="nav-icon" />
            <span>Settings</span>
          </button>
          <button className="nav-item logout">
            <LogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Welcome back, Dr. Sarah Wilson</h1>
            <p>Here's your practice overview</p>
          </div>
          
          <div className="header-actions">
            <div className="doctor-profile">
              <div className="profile-avatar">SW</div>
              <span className="doctor-name">Dr. Sarah Wilson</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon appointments">
              <Calendar />
            </div>
            <div className="stat-details">
              <h3>Total Appointments</h3>
              <p className="stat-value">24</p>
              <p className="stat-label">Today</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon hours">
              <Clock />
            </div>
            <div className="stat-details">
              <h3>Available Hours</h3>
              <p className="stat-value">6.5</p>
              <p className="stat-label">Hours remaining today</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon patients">
              <Users />
            </div>
            <div className="stat-details">
              <h3>Total Patients</h3>
              <p className="stat-value">1,234</p>
              <p className="stat-label">Lifetime</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon reports">
              <FileText />
            </div>
            <div className="stat-details">
              <h3>Reports Due</h3>
              <p className="stat-value">8</p>
              <p className="stat-label">Pending reports</p>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default DoctorDashboard;