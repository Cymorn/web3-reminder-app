import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashboardPage.css';

export default function HistoryPage() {
  const navigate = useNavigate();

  // You can later fetch from localStorage or API
  const pastProjects = [
    { name: 'Old Project X', tag: 'DeFi', status: 'Completed', dueDate: '01/06/2024' },
    { name: 'Archived DAO', tag: 'DAO', status: 'Completed', dueDate: '15/05/2024' },
  ];

  return (
    <div className="panel">
      <h2>Project History</h2>
      <button onClick={() => navigate('/dashboard')} className="add-button">← Back to Dashboard</button>

      <div className="project-grid">
        {pastProjects.map((project, index) => (
          <div key={index} className="project-card">
            <p><strong>{project.name}</strong> <span className="tag">{project.tag}</span></p>
            <p>Status: {project.status}</p>
            <p>Due Date: {project.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
