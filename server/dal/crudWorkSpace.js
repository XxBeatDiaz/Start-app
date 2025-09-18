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
  list[index] = updates;
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


/* 
// גרסה קודמת – שומרת על בדיקות ייחודיות ומונעת כפילויות
async function updateWorkspace(id, updates) {
  const list = await read(path);

  const index = list.findIndex(item => item._id === id);
  if (index === -1) throw new Error("Item not found");

  const project = list[index];

  for (const key in updates) {
    const value = updates[key];
    if (value === undefined) continue;
    if (Array.isArray(project[key]) && Array.isArray(value)) {
      value.forEach(newItem => {
        // בדיקה אם הפריט כבר קיים לפי url/path או name
        const exists = project[key].some(
          existing =>
            (newItem.url && existing.url === newItem.url) ||
            (newItem.path && existing.path === newItem.path)
        );
        if (!exists) {
          project[key].push(newItem);
        }
      });
    } else {
      // עדכון שדות רגילים
      project[key] = value;
    }
  }

  await write(path, list);
  return project;
}
*/

export {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  removeWorkspace,
  getWorkspaceById,
};
