import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ProjectsListPage from './pages/ProjectsListPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectPage from './pages/ProjectPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsListPage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  );
}
