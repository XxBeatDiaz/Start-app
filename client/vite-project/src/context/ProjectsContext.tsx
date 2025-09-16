import { createContext, useContext, useEffect, useState } from 'react';
import type { Project } from '../types';
import {
  fetchProjectsApi,
  createProjectApi,
  deleteProjectApi,
  updateProjectApi,
} from '../api/projects';

type ProjectsContextType = {
  projects: Project[];
  addProject: (p: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  getProjectById: (id?: string) => Project | undefined;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProjectsApi();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    load();
  }, []);

  const addProject = async (p: Project) => {
    try {
      const created = await createProjectApi(p);
      setProjects(prev => [...prev, created]);
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteProjectApi(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const updateProject = async (p: Project) => {
    try {
      const updated = await updateProjectApi(p);
      setProjects(prev => prev.map(pr => (pr._id === updated._id ? updated : pr)));
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const getProjectById = (id?: string) => projects.find(p => p._id === id);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider');
  return ctx;
};
