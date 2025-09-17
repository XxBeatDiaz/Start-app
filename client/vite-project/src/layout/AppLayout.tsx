import { Link ,Outlet} from 'react-router';
import { useProjects } from '../context/ProjectsContext';
import { useState } from 'react';

export default function AppLayout() {
    const { projects } = useProjects();
    const [searchTerm, setSearchTerm] = useState('');

    // סינון פרויקטים לפי החיפוש
    const filteredProjects = [...projects]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // מהחדש לישן
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="home-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <Link to="/">
                        <img src="/Logo.png" alt="logo" width={80} />
                        <h2>Start App</h2>
                    </Link>
                </div>

                <nav className="projects-nav">
                    <h3>Your Projects</h3>

                    {/* Search Box */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="search-box"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {filteredProjects.length > 0 ? (
                        <ul>
                            {filteredProjects.map((p) => (
                                <li key={p._id}>
                                    <Link to={`/projects/${p._id}`}>{p.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="muted">No matching projects found</p>
                    )}
                </nav>

                <Link to="/create" className="btn-create-project">
                    <img src="/newProject.png" alt="new project" width={70} />
                </Link>
            </aside>

            {/* Main content area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
