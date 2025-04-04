import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../styles/pages/admin/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <i className="fas fa-user-shield"></i>
          <h2>Admin Portal</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users nav-icon"></i>
            User Management
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-bar nav-icon"></i>
            Analytics & Reports
          </button>

          <button 
            className={`nav-item ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <i className="fas fa-exclamation-circle nav-icon"></i>
            Complaints
          </button>

          <button 
            className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            <i className="fas fa-robot nav-icon"></i>
            AI Management
          </button>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item logout"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-sign-out-alt nav-icon"></i>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-title">
            <h1>Admin Dashboard</h1>
            <p>System Overview and Management</p>
          </div>
          
          <div className="admin-profile">
            <div className="profile-avatar">AD</div>
            <span className="admin-name">Admin</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card users">
            <div className="stat-card-header">
              <h3 className="stat-title">Total Users</h3>
              <i className="fas fa-users stat-icon"></i>
            </div>
            <div className="stat-value">1,234</div>
            <div className="stat-label">Active accounts</div>
          </div>

          <div className="stat-card appointments">
            <div className="stat-card-header">
              <h3 className="stat-title">Appointments</h3>
              <i className="fas fa-calendar-check stat-icon"></i>
            </div>
            <div className="stat-value">156</div>
            <div className="stat-label">Today's appointments</div>
          </div>

          <div className="stat-card complaints">
            <div className="stat-card-header">
              <h3 className="stat-title">Open Complaints</h3>
              <i className="fas fa-exclamation-circle stat-icon"></i>
            </div>
            <div className="stat-value">23</div>
            <div className="stat-label">Requiring attention</div>
          </div>

          <div className="stat-card ai">
            <div className="stat-card-header">
              <h3 className="stat-title">AI Suggestions</h3>
              <i className="fas fa-robot stat-icon"></i>
            </div>
            <div className="stat-value">89%</div>
            <div className="stat-label">Accuracy rate</div>
          </div>
        </div>

        <div className="content-section">
          {activeTab === 'users' && (
            <div className="content-card">
              <div className="card-header">
                <h2>User Management</h2>
                <button className="export-button">
                  <i className="fas fa-download"></i>
                  Export Data
                </button>
              </div>
              <div className="card-content">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#001</td>
                      <td>Ganesh</td>
                      <td>Ganesh@mail.com</td>
                      <td>Patient</td>
                      <td><span className="status-badge status-confirmed">Active</span></td>
                      <td>
                        <button className="view-details-btn">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="content-card">
              <div className="card-header">
                <h2>Analytics & Reports</h2>
                <button className="export-button">
                  <i className="fas fa-download"></i>
                  Export Report
                </button>
              </div>
              <div className="card-content">
                <div className="analytics-grid">
                  <div className="chart-container">
                    <h3>User Growth</h3>
                    <div className="placeholder-chart">Monthly User Growth Chart</div>
                  </div>
                  <div className="chart-container">
                    <h3>Appointment Statistics</h3>
                    <div className="placeholder-chart">Appointment Distribution</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="content-card">
              <div className="card-header">
                <h2>Complaint Management</h2>
                <div className="filter-actions">
                  <select className="status-filter">
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button className="export-button">
                    <i className="fas fa-download"></i>
                    Export
                  </button>
                </div>
              </div>
              <div className="card-content">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#C001</td>
                      <td>Umesh</td>
                      <td>Appointment Scheduling Issue</td>
                      <td><span className="status-badge status-pending">Open</span></td>
                      <td>2024-03-15</td>
                      <td>
                        <button className="view-details-btn">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="content-card">
              <div className="card-header">
                <h2>AI System Management</h2>
                <button className="export-button">
                  <i className="fas fa-cog"></i>
                  Settings
                </button>
              </div>
              <div className="card-content">
                <div className="ai-management-grid">
                  <div className="ai-metrics">
                    <h3>Performance Metrics</h3>
                    <div className="metrics-list">
                      <div className="metric-item">
                        <span>Response Accuracy</span>
                        <div className="progress-bar">
                          <div className="progress" style={{width: '89%'}}></div>
                        </div>
                        <span>89%</span>
                      </div>
                      <div className="metric-item">
                        <span>Average Response Time</span>
                        <div className="progress-bar">
                          <div className="progress" style={{width: '95%'}}></div>
                        </div>
                        <span>1.2s</span>
                      </div>
                    </div>
                  </div>
                  <div className="ai-training">
                    <h3>Training Status</h3>
                    <div className="training-info">
                      <p>Last Updated: 2024-03-15 14:30</p>
                      <p>Model Version: v2.3.0</p>
                      <button className="ai-suggest-btn">
                        <i className="fas fa-sync"></i>
                        Update Model
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 