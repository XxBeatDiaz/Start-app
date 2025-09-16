import { write, read } from "./fs.js";

const path = "../server/db/workspaces.json";

// Create
async function createWorkspace(item) {
  const list = await read(path);
  list.push(item);
  await write(path, list);
  return item; 
}

// Read
async function getAllWorkspaces() {
  return await read(path);
}

// Update
async function updateWorkspace(id, updates) {
  const list = await read(path);
  const index = list.findIndex(item => item._id === id);
  if (index === -1) throw new Error("Item not found");

  list[index] = { ...list[index], ...updates };
  await write(path, list);
  return list[index];
}

// Delete
async function removeWorkspace(id) {
  const list = await read(path);
  const workspace = list.find(item => item._id == id);
  if (!workspace) throw new Error("Item not found");
  const updatedList = list.filter(item => item._id !== id);
  await write(path, updatedList);
  return true;
}

//Get by id
async function getWorkspaceById(id) {
  const list = await read(path);
  const item = list.find(i => i._id == id);
  if (!item) return false;
  return item;
}

export {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  removeWorkspace,
  getWorkspaceById
};
