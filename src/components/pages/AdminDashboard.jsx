import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/css-pages/AdminDashboard.css';

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

        {/* Content based on active tab */}
        <div className="content-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <button className="export-button">
              <i className="fas fa-download"></i>
              Export Data
            </button>
          </div>
          {/* Add content based on activeTab */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 