import { getAllLinks, createLink, updateLinkByUrl, getLinkById, removeLink } from "../dal/crudLink.js";


export async function getLinks(req, res) {
    try {
        const projects = await getAllLinks();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addLink(req, res) {
    try {
        const project = await createLink(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateLink(req, res) {
    try {
        const updated = await updateLinkByUrl(req.params.url, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteLink(req, res) {
    try {
        const deleted = await removeLink(req.params.url);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function getLink(req, res) {
    try {
        const item = await getLinkById(req.params.url);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

