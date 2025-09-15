// src/utils/storage.ts
import type { Project } from "../types";

// בדיקה אם אנחנו באלקטרון
export function isElectron() {
  try {
    return !!(window && (window as any).process && (window as any).process.type);
  } catch {
    return false;
  }
}

const STORAGE_KEY = "projects";

export const storage = {
  async getProjects(): Promise<Project[]> {
    if (isElectron()) {
      // באלקטרון → לא משתמשים ב-localStorage בכלל
      return [];
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }
  },

  async setProjects(projects: Project[]): Promise<void> {
    if (!isElectron()) {
      // רק באתר שומרים ב-localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  },
};
