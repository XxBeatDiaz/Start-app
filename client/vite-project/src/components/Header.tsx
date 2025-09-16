import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/"><strong>Project Manager</strong></Link>
        <nav>
          <Link to="/projects">Projects</Link>
          <Link to="/create">Create</Link>
        </nav>
      </div>
    </header>
  );
}
