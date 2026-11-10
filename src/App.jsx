import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Temporary Landing Page Placeholders
const PatientDashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
    <h1>Patient Landing Page & Dashboard</h1>
    <p>Welcome to AHAS! You are logged in as a Patient.</p>
  </div>
);

const DoctorDashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
    <h1>Doctor Landing Page & Dashboard</h1>
    <p>Welcome to AHAS! You are logged in as a Doctor.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root URL to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;