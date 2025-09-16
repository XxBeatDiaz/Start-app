import { useParams, useNavigate } from 'react-router';
import { useProjects } from '../context/ProjectsContext';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, deleteProject } = useProjects();

  const project = getProjectById(id);

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="project-container">
      <header className="project-header">
        <h2>{project.name}</h2>
        <button className="danger" onClick={() => { if (project._id) { deleteProject(project._id); navigate('/projects'); } }}>Delete Project</button>
        <button className="btn-secondary small" onClick={() => { if (project._id) { window.electronAPI.openAllProjectItems(project._id); } }}>Open all</button>
      </header>

      <section className="project-details">
        <p><strong>Description:</strong> {project.description}</p>
        {project.type && <p><strong>Type:</strong> {project.type.join(', ')}</p>}
        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
      </section>

      <section className="links-list">
        <h3>Links</h3>
        {project.webLinks && project.webLinks.length > 0 ? (
          <ul>
            {project.webLinks.map(id => <li key={id}><a href="#" onClick={(e) => e.preventDefault()}>{id}</a></li>)}
          </ul>
        ) : <p>No links added yet.</p>}
      </section>

      <section className="files-list">
        <h3>Files</h3>
        {project.filePaths && project.filePaths.length > 0 ? (
          <ul>
            {project.filePaths.map(id => <li key={id}>{id}</li>)}
          </ul>
        ) : <p>No files added yet.</p>}
      </section>
    </div>
  );
}
