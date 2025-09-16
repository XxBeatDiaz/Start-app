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

export{
    write,
    read
}