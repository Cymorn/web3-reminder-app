import React from 'react';
import '../css/DashboardPage.css';


function Dashboard() {
  return (
    <div className="panel">
      <h2>Dashboard</h2>
      <button className="add-button">+ Add Project</button>
      <div className="project-card">
        <p><strong>Project A</strong> <span className="tag">DAO</span></p>
        <p>Tag <span className="status">In Progress</span></p>
      </div>
      <div className="project-card">
        <p><strong>Project B</strong> <span className="tag">NFT</span></p>
        <p>Due Date <span className="status">Completed</span></p>
      </div>
      <div className="project-card">
        <p><strong>Project C</strong> <span className="tag">DeFi</span></p>
        <p>May 15, 22 <span className="status">May 20, 2024</span></p>
      </div>
    </div>
  );
}

export default Dashboard;
