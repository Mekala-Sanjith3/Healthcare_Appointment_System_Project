import React, { useState } from "react";
import "../../styles/css-pages/DoctorDashboard.css";
import { Calendar, Clock, Users, FileText } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending"
    }
  ]);

  const [stats] = useState({
    totalAppointments: 24,
    availableHours: 6.5,
    totalPatients: 1234,
    reportsDue: 8
  });

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle export schedule
  const handleExportSchedule = () => {
    console.log("Exporting schedule...");
  };

  // Handle view details
  const handleViewDetails = (appointmentId) => {
    console.log("Viewing details for appointment:", appointmentId);
  };

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Today's Appointments</h2>
              <button className="export-button" onClick={handleExportSchedule}>
                Export Schedule
              </button>
            </div>
            <div className="card-content">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.type}</td>
                        <td>{appointment.status}</td>
                        <td>
                          <button
                            className="view-details-btn"
                            onClick={() => handleViewDetails(appointment.id)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "availability":
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Set Availability</h2>
            </div>
            <div className="card-content">
              <p>Availability management coming soon...</p>
            </div>
          </div>
        );

      case "patient-history":
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Patient History</h2>
            </div>
            <div className="card-content">
              <p>Patient history records coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="card">
            <div className="card-content">
              <p>Content coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>Dr. Sarah Wilson</p>
        <p>SW</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <Calendar className="stat-icon" />
            <h3>Total Appointments</h3>
          </div>
          <div className="value">{stats.totalAppointments}</div>
          <p className="stat-label">Today</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Clock className="stat-icon" />
            <h3>Available Hours</h3>
          </div>
          <div className="value">{stats.availableHours}</div>
          <p className="stat-label">Hours remaining today</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Users className="stat-icon" />
            <h3>Total Patients</h3>
          </div>
          <div className="value">{stats.totalPatients}</div>
          <p className="stat-label">Lifetime</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FileText className="stat-icon" />
            <h3>Reports Due</h3>
          </div>
          <div className="value">{stats.reportsDue}</div>
          <p className="stat-label">Pending reports</p>
        </div>
      </div>

      <div className="tabs-list">
        {["appointments", "availability", "patient-history", "ai-availability", "patient-report"].map((tab) => (
          <button
            key={tab}
            className={`tab-trigger ${activeTab === tab ? "active" : ""}`}
            data-state={activeTab === tab ? "active" : ""}
            onClick={() => handleTabChange(tab)}
          >
            {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default DoctorDashboard;