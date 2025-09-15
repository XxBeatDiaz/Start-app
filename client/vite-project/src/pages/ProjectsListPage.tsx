import { Link } from 'react-router';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectsContext';

export default function ProjectsListPage() {
  const { projects, deleteProject } = useProjects();

  return (
    <div className="projects-list-page">
      <h1>All Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map(p => (
            <Link key={p._id} to={`/projects/${p._id}`} >
              <ProjectCard project={p} onDelete={() => p._id && deleteProject(p._id)} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
