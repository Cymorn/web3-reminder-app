import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProjectPage from './AddProjectPage';
import '../css/DashboardPage.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickerCoins, setTickerCoins] = useState([]);
  const [autoDiscoveredProjects, setAutoDiscoveredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState({});
  const [githubTasks, setGithubTasks] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");

  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(saved);
  }, []);

  const openModal = () => setShowAddProject(true);
  const closeModal = () => {
    setShowAddProject(false);
    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(saved);
  };

  useEffect(() => {
    const logos = {};
    projects.forEach(project => {
      try {
        if (project.socialLink && project.socialLink.startsWith('http')) {
          const domain = new URL(project.socialLink).hostname;
          logos[project.name] = `https://logo.clearbit.com/${domain}`;
        }
      } catch (error) {
        logos[project.name] = '';
      }
    });
    setProjectImages(logos);
  }, [projects]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => res.json())
      .then(data => setTickerCoins(data.slice(0, 10)))
      .catch(err => console.error("Crypto fetch error:", err));
  }, []);

  useEffect(() => {
    fetch('https://api.llama.fi/protocols')
      .then(res => res.json())
      .then(data => {
        const newProjects = data.slice(0, 5).map(d => ({
          name: d.name,
          category: d.category || 'DeFi',
          url: d.url || `https://${d.slug}.com`
        }));
        setAutoDiscoveredProjects(newProjects);
      })
      .catch(err => console.error("Web3 project fetch error:", err));
  }, []);

  useEffect(() => {
    const fetchGitHubTasks = async () => {
      const tasks = {};
      for (const project of projects) {
        try {
          if (project.socialLink && project.socialLink.includes('github.com')) {
            const url = new URL(project.socialLink);
            const [_, owner, repo] = url.pathname.split('/');
            if (owner && repo) {
              const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
              const data = await res.json();
              tasks[project.name] = data.slice(0, 3).map(issue => ({
                title: issue.title,
                url: issue.html_url
              }));
            }
          }
        } catch (err) {
          console.error("GitHub issue fetch error:", err);
        }
      }
      setGithubTasks(tasks);
    };
    fetchGitHubTasks();
  }, [projects]);

  const today = new Date().toISOString().slice(0, 10);
  const todaysTasks = projects.flatMap(project =>
    project.tasks?.filter(task => task.dueDate === today && !task.done)
      .map(task => ({ title: task.title, project: project.name })) || []
  );

  return (
    <div className="dashboard-container">
      <button className="add-project-btn" onClick={openModal}>+ Add Project</button>

      {showAddProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddProjectPage onClose={closeModal} />
          </div>
        </div>
      )}

      <div className="dashpanel">
        <div className="crypto-ticker">
          <div className="ticker-content">
            {tickerCoins.map(coin => (
              <span key={coin.id} className="ticker-item">
                <img src={coin.image} alt={coin.symbol} className="ticker-icon" />
                {coin.symbol.toUpperCase()}: ${coin.current_price.toLocaleString()}
                <span style={{ color: coin.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red' }}>
                  {' '}{coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                </span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {todaysTasks.length > 0 && (
          <div className="reminder-box">
            <strong>🔔 You have {todaysTasks.length} task(s) due today:</strong>
            <ul>
              {todaysTasks.map((task, i) => (
                <li key={i}>{task.title} <em>({task.project})</em></li>
              ))}
            </ul>
          </div>
        )}

        <div className="dashboard-tabs">
          <button onClick={() => setActiveTab("dashboard")}>DASHBOARD</button>
          <button onClick={() => setActiveTab("projects")}>PROJECTS</button>
          <button onClick={() => setActiveTab("tasks")}>TASKS</button>
          <button onClick={() => navigate('/history')}>HISTORY</button>
          <div className="profile-logout">
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button onClick={() => navigate('/login')}>Logout</button>
          </div>
        </div>

        <div className={`tab-content slide-${activeTab}`}>
          {activeTab === "dashboard" && (
            <div className="tab-panel">
              <h2>📊 Welcome to Your Dashboard</h2>
              <p>This is your overview tab.</p>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="tab-panel">
              <h2>📁 Your Projects</h2>
              <div className="project-grid">
                {projects.map((project, index) => (
                  <div key={index} className="project-card">
                    {projectImages[project.name] && (
                      <img
                        src={projectImages[project.name]}
                        alt="logo"
                        className="project-logo"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                    <p><strong>{project.name}</strong> <span className="tag">{project.tag}</span></p>
                    <p>Status: <span className="status">{project.status}</span></p>
                    <p>Due Date: ⏳ {project.dueDate}</p>

                    {project.socialLink && project.socialLink.startsWith('http') ? (
                      <p>
                        🔗 <a href={project.socialLink} target="_blank" rel="noreferrer">
                          {new URL(project.socialLink).hostname}
                        </a>
                      </p>
                    ) : (
                      <p>🔗 No valid link</p>
                    )}

                    {githubTasks[project.name] && (
                      <div className="github-tasks">
                        <strong>GitHub Issues:</strong>
                        <ul>
                          {githubTasks[project.name].map((issue, i) => (
                            <li key={i}>
                              <a href={issue.url} target="_blank" rel="noreferrer">{issue.title}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="tab-panel">
              <h2>📋 Your Tasks</h2>
              <ul>
                {todaysTasks.length ? (
                  todaysTasks.map((task, i) => (
                    <li key={i}>{task.title} — <em>{task.project}</em></li>
                  ))
                ) : (
                  <li>No tasks due today</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {autoDiscoveredProjects.length > 0 && (
          <div className="auto-box">
            <h3>🧠 Web3 Projects You Might Like</h3>
            <ul>
              {autoDiscoveredProjects.map((p, i) => (
                <li key={i}>
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.name} — <em>{p.category}</em>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
