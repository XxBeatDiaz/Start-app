import { useParams, Link } from "react-router";
import { useProjects } from "../context/ProjectsContext";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, deleteProject } = useProjects();
  const project = getProjectById(id);

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="project-view">
      <header className="project-header">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <div className="header-actions">
          <Link to={`/projects/${project._id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
        </div>
      </header>

      <section className="links-list">
        <h3>Links</h3>
        {project.webLinks?.length ? (
          <ul>
            {project.webLinks.map((l, idx) => (
              <li key={idx}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.name || l.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No links yet.</p>
        )}
      </section>

      <section className="files-list">
        <h3>Files</h3>
        {project.filePaths?.length ? (
          <ul>
            {project.filePaths.map((f, idx) => (
              <li key={idx}>
                <span>{f.name || f.path}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files yet.</p>
        )}
      </section>
      <section className="card-actions card-actions-project-page">
        <button
          className="btn-secondary small"
          onClick={(e) => {
            if (project._id) {
              window.electronAPI.openAllProjectItems(project._id);
              e.stopPropagation();
            }
          }}
        >
          Open all
        </button>
        <div className="project-dates">
          <small>
            Created: {new Date(project.createdAt).toLocaleString()}
          </small>
          {project.updatedAt && (
            <small>
              {" | "}Updated: {new Date(project.updatedAt).toLocaleString()}
            </small>
          )}
        </div>

        <button
          className="danger small"
          onClick={(e) => {
            e.preventDefault();
            deleteProject(project._id!);
          }}
        >
          Delete
        </button>

      </section>

    </div>
  );
}
