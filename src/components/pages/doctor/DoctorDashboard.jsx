import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../common/Table/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../common/Card/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../common/Tabs/tabs";
import "../../../styles/pages/doctor/DoctorDashboard.css";
import { Calendar, Clock, Users, FileText, Bell, Settings, LogOut, Brain, History } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments] = useState([
    {
      id: 1,
      patientName: "Siva Ram",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    {
      id: 2,
      patientName: "Chetan",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    {
      id: 3,
      patientName: "Umesh Chandra",
      time: "02:00 PM",
      type: "Consultation",
      status: "Confirmed",
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random"
    }
  ]);

  const notifications = [
    {
      id: 1,
      message: "New appointment request from Yashwanth",
      time: "5 minutes ago",
      type: "appointment"
    },
    {
      id: 2,
      message: "Lab results ready for patient Raghu",
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

  const [patientHistory, setPatientHistory] = useState([
    {
      id: 1,
      name: "John Doe",
      lastVisit: "2024-03-15",
      condition: "Hypertension",
      status: "Stable",
      nextAppointment: "2024-04-01",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    {
      id: 2,
      name: "Jane Smith",
      lastVisit: "2024-03-10",
      condition: "Diabetes",
      status: "Improving",
      nextAppointment: "2024-03-25",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    }
  ]);

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: "2024-03-20",
      time: "09:00 AM",
      type: "Follow-up",
      patient: "John Doe",
      status: "Confirmed",
      notes: "Blood pressure check"
    },
    {
      id: 2,
      date: "2024-03-20",
      time: "10:30 AM",
      type: "New Patient",
      patient: "Alice Johnson",
      status: "Pending",
      notes: "Initial consultation"
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      patient: "John Doe",
      type: "Lab Results",
      date: "2024-03-18",
      status: "Pending Review",
      priority: "High",
      category: "Blood Test"
    },
    {
      id: 2,
      patient: "Jane Smith",
      type: "X-Ray",
      date: "2024-03-17",
      status: "Completed",
      priority: "Medium",
      category: "Radiology"
    }
  ]);

  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Add any logout logic here (clearing tokens, user data, etc.)
    // Then navigate to homepage
    navigate('/');
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
              <div className="search-filter">
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  className="search-input"
                />
                <select className="filter-select">
                  <option value="">All Conditions</option>
                  <option value="Hypertension">Hypertension</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Cardiac">Cardiac</option>
                </select>
              </div>
            </div>
            <div className="patient-history-list">
              {patientHistory.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-info">
                    <img src={patient.avatar} alt={patient.name} className="patient-avatar" />
                    <div className="patient-details">
                      <h3>{patient.name}</h3>
                      <p className="condition">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="patient-status">
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                    <p className="last-visit">Last Visit: {patient.lastVisit}</p>
                  </div>
                  <div className="patient-actions">
                    <button className="view-btn">
                      <i className="fas fa-eye"></i>
                      View Details
                    </button>
                    <button className="schedule-btn">
                      <i className="fas fa-calendar-plus"></i>
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="content-card">
            <div className="card-header">
              <h2>Schedule Management</h2>
              <div className="schedule-actions">
                <button className="add-schedule-btn">
                  <i className="fas fa-plus"></i>
                  Add New Schedule
                </button>
                <button className="export-btn">
                  <i className="fas fa-download"></i>
                  Export Schedule
                </button>
              </div>
            </div>
            <div className="schedule-list">
              {schedules.map(schedule => (
                <div key={schedule.id} className="schedule-card">
                  <div className="schedule-time">
                    <span className="date">{schedule.date}</span>
                    <span className="time">{schedule.time}</span>
                  </div>
                  <div className="schedule-details">
                    <h3>{schedule.patient}</h3>
                    <p className="type">{schedule.type}</p>
                    <p className="notes">{schedule.notes}</p>
                  </div>
                  <div className="schedule-status">
                    <span className={`status-badge ${schedule.status.toLowerCase()}`}>
                      {schedule.status}
                    </span>
                    <div className="schedule-actions">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="cancel-btn">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="content-card">
            <div className="card-header">
              <h2>Reports & Documents</h2>
              <div className="report-filters">
                <select className="filter-select">
                  <option value="">All Categories</option>
                  <option value="Lab">Lab Results</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Pathology">Pathology</option>
                </select>
                <select className="filter-select">
                  <option value="">All Status</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="reports-list">
              {reports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <h3>{report.patient}</h3>
                    <span className={`priority-badge ${report.priority.toLowerCase()}`}>
                      {report.priority}
                    </span>
                  </div>
                  <div className="report-details">
                    <p className="type">{report.type}</p>
                    <p className="category">{report.category}</p>
                    <p className="date">Date: {report.date}</p>
                  </div>
                  <div className="report-status">
                    <span className={`status-badge ${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                    <div className="report-actions">
                      <button className="view-btn">
                        <i className="fas fa-file-alt"></i>
                        View Report
                      </button>
                      <button className="download-btn">
                        <i className="fas fa-download"></i>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          <button className="nav-item logout" onClick={handleLogout}>
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
            <h1>Welcome back, Dr. Mohan Venkat</h1>
            <p>Here's your practice overview</p>
          </div>
          
          <div className="header-actions">
            <div className="doctor-profile">
              <div className="profile-avatar">MV</div>
              <span className="doctor-name">Dr. Mohan Venkat</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper appointments">
                <Calendar className="stat-icon" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Appointments</p>
                <h3 className="stat-value">24</h3>
                <p className="stat-trend positive">
                  <span>↑ 12%</span> vs last week
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper hours">
                <Clock className="stat-icon" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Available Hours</p>
                <h3 className="stat-value">6.5</h3>
                <p className="stat-trend">Hours remaining today</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper patients">
                <Users className="stat-icon" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Patients</p>
                <h3 className="stat-value">1,234</h3>
                <p className="stat-trend positive">
                  <span>↑ 8%</span> this month
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper reports">
                <FileText className="stat-icon" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Reports Due</p>
                <h3 className="stat-value">8</h3>
                <p className="stat-trend negative">
                  <span>↑ 2</span> from yesterday
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default DoctorDashboard;