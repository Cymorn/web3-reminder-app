import React, { useState } from 'react';
import '../css/AddProjectPage.css';

export default function AddProjectPage({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    tag: '',
    dueDate: '',
    status: 'In Progress',
    socialLink: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    savedProjects.push({ ...form, tasks: [] });
    localStorage.setItem('projects', JSON.stringify(savedProjects));

    alert(`✅ Project "${form.name}" added!`);
    onClose(); // Close modal and refresh list
  };

  return (
    <div className="panel">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Add New Project</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="tag"
          placeholder="Tag (e.g. DAO, NFT)"
          value={form.tag}
          onChange={handleChange}
        /><br />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        /><br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select><br />

        <input
          type="url"
          name="socialLink"
          placeholder="Project Website / Social Link"
          value={form.socialLink}
          onChange={handleChange}
        /><br />

        <div className="button-container">
          <button type="submit" className="add-project-button">Add Project</button>
          <button type="button" onClick={onClose} className="cancel-button">← Cancel</button>
        </div>
      </form>
    </div>
  );
}
