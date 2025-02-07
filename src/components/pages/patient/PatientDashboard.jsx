import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../common/Table/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../common/Card/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../common/Tabs/tabs";
import "../../../styles/pages/patient/PatientDashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <i className="fas fa-user-circle"></i>
          <h2>Patient Portal</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <i className="fas fa-calendar-alt nav-icon"></i>
            Appointments
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'telemedicine' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemedicine')}
          >
            <i className="fas fa-video nav-icon"></i>
            Telemedicine
          </button>

          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <i className="fas fa-history nav-icon"></i>
            Medical History
          </button>

          <button 
            className={`nav-item ${activeTab === 'ai-recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-recommendations')}
          >
            <i className="fas fa-robot nav-icon"></i>
            AI Recommendations
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
            <h1>Welcome, John Doe</h1>
            <p>Manage your healthcare journey</p>
          </div>
          
          <div className="doctor-profile">
            <div className="profile-avatar">JD</div>
            <span className="doctor-name">John Doe</span>
          </div>
        </div>

        {/* Add your dashboard content here based on activeTab */}
      </main>
    </div>
  );
};

export default PatientDashboard; 