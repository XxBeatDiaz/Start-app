// server/crud/jsonCrud.js
import fs from "fs/promises";

// קריאה
async function read(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    const json = JSON.parse(data);
    return Array.isArray(json) ? json : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(path, "[]");
      return [];
    }
    console.error("Error reading file:", error);
    return [];
  }
}

// כתיבה
async function write(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

// Create
async function create(path, item) {
  const list = await read(path);
  list.push(item);
  await write(path, list);
  return item;
}

// Read
async function getAll(path) {
  return await read(path);
}

// Update
async function update(path, id, updates) {
  const list = await read(path);
  const index = list.findIndex(item => item.id === id);
  if (index === -1) throw new Error("Item not found");

  list[index] = { ...list[index], ...updates };
  await write(path, list);
  return list[index];
}

// Delete
async function remove(path, id) {
  let list = await read(path);
  const index = list.findIndex(item => item._id === id);
  if (index === -1) throw new Error("Item not found");

  const [removed] = list.splice(index, 1);
  await write(path, list);
  return removed;
}

export {
  create,
  getAll,
  update,
  remove
};
