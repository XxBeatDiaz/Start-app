import { Link } from 'react-router';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from '../components/ProjectCard';

export default function HomePage() {
  const { projects, deleteProject } = useProjects();
  const recent = [...projects].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Project Manager</h1>
        <p>Manage all your projects in one place</p>
        <div className="hero-actions">
          <Link to="/create" className="btn-primary">➕ New Project</Link>
          {projects.length > 0 && <Link to="/projects" className="btn-secondary">📋 View All</Link>}
        </div>
      </section>

      {recent.length > 0 ? (
        <section className="recent-projects">
          <h2>Recent Projects</h2>
          <div className="projects-grid">
            {recent.map(p => (
              <Link key={p._id} to={`/projects/${p._id}`} >
                <ProjectCard project={p} onDelete={() => p._id && deleteProject(p._id)} />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="empty-state">
          <h2>🚀 Let’s start!</h2>
          <p>No projects yet. Create your first one.</p>
          <Link to="/create" className="btn-primary">Create First Project</Link>
        </section>
      )}
    </div>
  );
}
