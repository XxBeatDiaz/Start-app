import { getAllPath,createPath,updatePath,removePath,getPathById } from "../dal/crudPath.js";



export async function getPaths(req, res) {
    try {
        const projects = await getAllPath();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addPath(req, res) {
    try {
        const project = await createPath(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const updated = await updatePath(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePath(req, res) {
    try {
        const deleted = await removePath(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getPath(req, res) {
    try {
        const item = await getPathById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
}