import React, { useState } from "react"
import { Calendar, Clock, FileText, History, Users, Search, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Label } from "../../components/label"
import { Switch } from "../../components/switch"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "../../styles/css-pages/DoctorDashboard.css"

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments")
  const [date, setDate] = useState(new Date())

  // Sample data (you would typically fetch this from an API)
  const appointments = [
    { id: 1, patientName: "John Doe", time: "09:00 AM", type: "Check-up", status: "Confirmed" },
    { id: 2, patientName: "Jane Smith", time: "10:30 AM", type: "Follow-up", status: "Pending" },
  ]

  const patientHistory = [
    {
      id: 1,
      patientName: "John Doe",
      lastVisit: "2024-01-15",
      diagnosis: "Common Cold",
      treatment: "Prescribed antibiotics",
    },
    { id: 2, patientName: "Jane Smith", lastVisit: "2024-01-10", diagnosis: "Migraine", treatment: "Pain medication" },
  ]

  const aiData = [
    { time: "9 AM", patients: 4, efficiency: 85 },
    { time: "10 AM", patients: 6, efficiency: 90 },
    { time: "11 AM", patients: 8, efficiency: 95 },
    { time: "12 PM", patients: 4, efficiency: 80 },
    { time: "1 PM", patients: 2, efficiency: 75 },
    { time: "2 PM", patients: 5, efficiency: 85 },
    { time: "3 PM", patients: 7, efficiency: 90 },
    { time: "4 PM", patients: 3, efficiency: 80 },
  ]

  const reports = [
    { id: 1, patientName: "John Doe", reportType: "Blood Test", date: "2024-01-20", status: "Pending" },
    { id: 2, patientName: "Jane Smith", reportType: "X-Ray", date: "2024-01-19", status: "Completed" },
  ]

  return (
    <div className="dashboard-container">
      {/* Doctor Info Header */}
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>Dr. Sarah Wilson</p>
        <p>SW</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <Calendar className="stat-icon" />
            <h3>Total Appointments</h3>
          </div>
          <div className="value">24</div>
          <p className="stat-label">Today</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Clock className="stat-icon" />
            <h3>Available Hours</h3>
          </div>
          <div className="value">6.5</div>
          <p className="stat-label">Hours remaining today</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Users className="stat-icon" />
            <h3>Total Patients</h3>
          </div>
          <div className="value">1,234</div>
          <p className="stat-label">Lifetime</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FileText className="stat-icon" />
            <h3>Reports Due</h3>
          </div>
          <div className="value">8</div>
          <p className="stat-label">Pending reports</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-list">
        <button className="tab-trigger" data-state="active">Appointments</button>
        <button className="tab-trigger">Availability</button>
        <button className="tab-trigger">Patient History</button>
        <button className="tab-trigger">AI Availability</button>
        <button className="tab-trigger">Patient Report</button>
      </div>

      {/* Today's Appointments */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Today's Appointments</h2>
          <button className="export-button">Export Schedule</button>
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
                <tr>
                  <td>John Doe</td>
                  <td>09:00 AM</td>
                  <td>Check-up</td>
                  <td>Confirmed</td>
                  <td>
                    <button className="view-details-btn">View Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>10:30 AM</td>
                  <td>Follow-up</td>
                  <td>Pending</td>
                  <td>
                    <button className="view-details-btn">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard