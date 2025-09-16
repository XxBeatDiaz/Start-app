import { Routes, Route } from 'react-router';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectPage from './pages/ProjectPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateProjectPage />} />
        <Route path="projects/:id" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}
