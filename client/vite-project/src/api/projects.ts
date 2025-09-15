// src/api/projects.ts
import type { Project } from "../types";

const BASE_URL = "http://localhost:3131/workspace";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/get-all`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(p: Project): Promise<Project> {
  const res = await fetch(`${BASE_URL}/add-project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProjectApi(p: Project): Promise<Project> {
  const res = await fetch(`${BASE_URL}/update/${p._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProjectApi(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
}
