import { write, read } from "./fs.js";

const path = "./db/workspaces.json";


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
  const index = list.findIndex(item => item.id === id);
  if (index === -1) throw new Error("Item not found");

  list[index] = { ...list[index], ...updates };
  await write(path, list);
  return list[index];
}

// Delete
async function removeWorkspace(id) {
  let list = await read(path);
  const index = list.findIndex(item => item.id === id);
  if (index === -1) throw new Error("Item not found");
  const [removed] = list.splice(index, 1);
  await write(path, list);
  return removed;
}

//Get by id
async function getWorkspaceById(id) {
  const list = await read(path);
  const item = list.find(i => i.id == id);
  console.log( "item:", list, id, item);
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
