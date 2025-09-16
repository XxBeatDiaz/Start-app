import {removeWorkspace,createWorkspace,getWorkspaceById,updateWorkspace,getAllWorkspaces } from "../dal/crudWorkSpace.js"


export async function getProjects(req, res) {
    try {
        const projects = await getAllWorkspaces();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addProject(req, res) {
    try {
        const project = await createWorkspace(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateProject(req, res) {
    try {
        const updated = await updateWorkspace(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteProject(req, res) {
    try {
        const deleted = await removeWorkspace(req.params.id);

        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getWorkspace(req, res) {
    try {
        const item = await getWorkspaceById(req.params.id);
        console.log("Workspace item:", item);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }  
}