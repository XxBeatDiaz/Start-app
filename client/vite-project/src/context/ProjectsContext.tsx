// src/context/ProjectsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";
import type { Project } from "../types";

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
      // קודם בודקים אם יש ב-localStorage (רק באתר)
      // const cached = await storage.getProjects();
      // if (cached.length > 0) {
      //   setProjects(cached);
      // }

      try {
        // תמיד מושכים מהשרת
        const res = await fetch("http://localhost:3131/workspace/getall");
        const data: Project[] = await res.json();
        setProjects(data);

        // שומרים רק באתר
        // await storage.setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects from server:", err);
      }
    })();
  }, []);

  const addProject = async (p: Project) => {
    try {
      const res = await fetch("http://localhost:3131/workspace/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const saved = await res.json();
      const next = [...projects, saved];
      setProjects(next);
      await storage.setProjects(next);
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await fetch(`http://localhost:3131/workspace/delete/${id}`, { method: "DELETE" });
      const next = projects.filter(pr => pr._id !== id);
      setProjects(next);
      await storage.setProjects(next);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const updateProject = async (p: Project) => {
    try {
      const res = await fetch(`http://localhost:3131/workspace/update/${p._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const updated = await res.json();
      const next = projects.map(pr => (pr._id === updated._id ? updated : pr));
      setProjects(next);
      await storage.setProjects(next);
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const getProjectById = (id?: string) => projects.find(pr => pr._id === id);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject, updateProject, getProjectById }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
}
