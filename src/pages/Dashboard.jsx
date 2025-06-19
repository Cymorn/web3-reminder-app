import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashboardPage.css';

function Dashboard() {
  const navigate = useNavigate(); // hook must be called inside the component

  return (
    <div className="panel">
      <h2>Dashboard</h2>

      {/* ✅ Fixed: add onClick handler */}
      <button className="add-button" onClick={() => navigate('/add')}>
        + Add Project
      </button>

      <div className="project-card">
        <p><strong>Project A</strong> <span className="tag">DAO</span></p>
        <p>Status <span className="status">In Progress</span></p>
        <p>Due Date <span className="status"> ⏳ 20/7/2025 (10 days remaining) </span></p>
        <p>Project's social links <span className='links'> </span></p>
      </div>

      <div className="project-card">
        <p><strong>Project B</strong> <span className="tag">NFT</span></p>
        <p>Status <span className="status">In Progress</span></p>
        <p>Due Date <span className="status"> ⏳ 20/7/2025 (10 days remaining) </span></p>
      </div>

      <div className="project-card">
        <p><strong>Project C</strong> <span className="tag">DeFi</span></p>
        <p>Status <span className="status">In Progress</span></p>
        <p>Due Date <span className="status"> ⏳ 20/7/2025 (10 days remaining) </span></p>
      </div>
    </div>
  );
}

export default Dashboard;
