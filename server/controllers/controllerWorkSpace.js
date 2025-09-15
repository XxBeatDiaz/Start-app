import { getAll, create, update, remove } from "../dal/crud.js"

const filePath = "./db/workspaces.json"


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
        const deleted = await remove(filePath, req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
