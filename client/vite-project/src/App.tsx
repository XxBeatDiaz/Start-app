import Header from './components/Header';
import Router from './Router';
import { ProjectsProvider } from './context/ProjectsContext';
import "./styles.css"

export default function App() {
  return (
    <ProjectsProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Router />
        </main>
      </div>
    </ProjectsProvider>
  );
}
