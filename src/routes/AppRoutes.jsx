import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/pages/home/HomePage';
import DoctorLogin from '../components/pages/doctor/DoctorLogin';
import DoctorDashboard from '../components/pages/doctor/DoctorDashboard';
import PatientLogin from '../components/pages/patient/PatientLogin';
import PatientDashboard from '../components/pages/patient/PatientDashboard';
import AdminLogin from '../components/pages/admin/AdminLogin';
import AdminDashboard from '../components/pages/admin/AdminDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 