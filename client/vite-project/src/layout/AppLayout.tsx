import { Outlet } from 'react-router';
import { useProjects } from '../context/ProjectsContext';
import { Link } from 'react-router';

export default function AppLayout() {
    const { projects } = useProjects();

    return (
        <div className="home-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <Link to="/">
                        <img src="Logo.png" alt="logo" width={80} />
                        <h2>Start App</h2>
                    </Link>
                </div>
                <nav className="projects-nav">
                    <h3>Your Projects</h3>
                    {projects.length > 0 ? (
                        <ul>
                            {[...projects] // עושים עותק כדי לא לשנות את ה-state
                                .sort((a, b) => b.createdAt - a.createdAt) // ממיין מהחדש לישן
                                .map((p) => (
                                    <li key={p._id}>
                                        <Link to={`/projects/${p._id}`}>{p.name}</Link>
                                    </li>
                                ))}
                        </ul>

                    ) : (
                        <p className="muted">No projects yet</p>
                    )}
                </nav>
                <Link to="/create" className="btn-create-project">
                    <img src="newProject.png" alt="new project" width={70} />
                </Link>
            </aside>

            {/* Main content area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
