import { write, read } from "./fs.js";

const path = "../server/db/Links.json";


// Create
async function createLink(item) {
  const list = await read(path);
  list.push(item);
  await write(path, list);
  return item;
}

// Read
async function getAllLinks() {
  return await read(path);
}

// Update
async function updateLinkById(id, updates) {
  const list = await read(path);
  const index = list.findIndex(item => item.id == id);
  if (index === -1) throw new Error("Item not found");

  list[index] = { ...list[index], ...updates };
  await write(path, list);
  return list[index];
}

// Delete
async function removeLink(id) {
  let list = await read(path);
  const index = list.findIndex(item => item.id == id);
  if (index === -1) throw new Error("Item not found");
  const [removed] = list.splice(index, 1);
  await write(path, list);
  return removed;
}

//Get by id
async function getLinkById(id) {
  const list = await read(path);
  const item = list.find(i => i._id == id);
  if (!item) return false;
  return item;
}

export {
  createLink,
  getAllLinks,
  updateLinkById,
  removeLink,
  getLinkById
};
