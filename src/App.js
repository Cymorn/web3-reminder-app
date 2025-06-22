import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Dashboard from './pages/Dashboard.jsx';
import AddProjectPage from './pages/AddProjectPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CryptoPage from './pages/CryptoPage';
import HistoryPage from './pages/HistoryPage';
import Profile from './pages/Profile';






// Replace or create this page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddProjectPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="Profile" element={<Profile />} />



      </Routes>
    </Router>
  );
}

export default App;
