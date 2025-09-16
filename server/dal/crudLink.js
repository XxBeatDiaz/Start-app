import { write, read } from "./fs.js";

const path = "../server/db/Links.json";


// Create
async function createLink(newLinks) {
  const list = await read(path);
  // שמירה רק על פריטים עם URL שלא קיימים כבר ברשימה
  const filteredNewLinks = newLinks.filter(
    newItem => !list.some(item => item.url === newItem.url)
  );
  const merged = [...list, ...filteredNewLinks];

  await write(path, merged);
  return merged;
}




// Read
async function getAllLinks() {
  return await read(path);
}

// Update
async function updateLinkByUrl(url, updates) {
  const list = await read(path);
  const item = list.find(item => item.url === url);
  if (!item) throw new Error("Item not found");
  if (updates.name !== undefined) item.name = updates.name;
  if (updates.url !== undefined) item.url = updates.url;
  await write(path, list);

  return item;
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
  updateLinkByUrl,
  removeLink,
  getLinkById
};
