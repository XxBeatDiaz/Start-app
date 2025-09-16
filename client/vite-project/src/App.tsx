import Router from './Router';
import { ProjectsProvider } from './context/ProjectsContext';
import "./styles/AppLayout.css";
import "./styles/HomePage.css";
import "./styles/CreateProjectPage.css";
import "./styles/ProjectPage.css";
import "./styles/ProjectCard.css";


export default function App() {
  return (
    <ProjectsProvider>

      <Router />
    </ProjectsProvider>
  );
}
