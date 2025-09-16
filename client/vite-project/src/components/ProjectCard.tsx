import type { Project } from '../types';

export default function ProjectCard({ project, onDelete }: { project: Project; onDelete?: () => void }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p className="muted">{project.description}</p>
      <div className="card-actions">
        <button className="btn-secondary small" onClick={(e) => { if (project._id) { window.electronAPI.openAllProjectItems(project._id); e.stopPropagation() }}}>Open all</button>
        {onDelete && <button className="danger small" onClick={(e) => { e.preventDefault(); onDelete(); }}>Delete</button>}
      </div>
    </div>
  );
}
