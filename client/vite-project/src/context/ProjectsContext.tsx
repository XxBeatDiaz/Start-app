import React, { createContext, useContext, useEffect, useState } from "react";
import type { Project } from "../types";
import { fetchProjects, createProject, updateProjectApi, deleteProjectApi } from "../api/projects.ts";

type ProjectsContextType = {
  projects: Project[];
  addProject: (p: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  getProjectById: (id?: string) => Project | undefined;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    })();
  }, []);

  const addProject = async (p: Project) => {
    try {
      const saved = await createProject(p);
      setProjects(prev => [...prev, saved]);
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteProjectApi(id);
      setProjects(prev => prev.filter(pr => pr._id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const updateProject = async (p: Project) => {
    try {
      const updated = await updateProjectApi(p);
      setProjects(prev => prev.map(pr => (pr._id === updated._id ? updated : pr)));
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const getProjectById = (id?: string) => projects.find(pr => pr._id === id);

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, deleteProject, updateProject, getProjectById }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
}
