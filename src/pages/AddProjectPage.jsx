
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashboardPage.css'; // reuse same styles

export default function AddProjectPage() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('In Progress');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name,
      tag,
      dueDate,
      status,
    };

    // Save to localStorage or state later
    alert(`Project "${name}" added!`);
    navigate('/dashboard');
  };

  return (
    <div className="panel">
      <h2>Add New Project</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br/>

        <input
          type="text"
          placeholder="Tag (e.g., DAO, NFT)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        /><br/>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        /><br/>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select><br/>

        <button type="submit">Save Project</button>
      </form>

      <button onClick={() => navigate('/dashboard')} className="add-button">
        ← Back to Dashboard
      </button>
    </div>
  );
}
