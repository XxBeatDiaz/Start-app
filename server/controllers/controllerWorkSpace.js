import { getAll, create, update, remove } from "../dal/crud.js"

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../db/workspaces.json");

export async function getProjects(req, res) {
    try {
        const projects = await getAll(filePath);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addProject(req, res) {
    try {
        const project = await create(filePath, req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateProject(req, res) {
    try {
        const updated = await update(filePath, req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteProject(req, res) {
    try {
        const {id} = req.params;
        const deleted = await remove(filePath, id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
