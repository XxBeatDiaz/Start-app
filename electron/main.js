import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, shell, ipcMain } from 'electron'
import startServer from '../server/app.js';
import { getWorkspaceById } from '../server/dal/crudWorkSpace.js';
import { getLinkById } from '../server/dal/crudLink.js';
import { getPathById } from '../server/dal/crudPath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreenable: true,
    icon: path.join(__dirname, './assets/Logo.png'),
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile(path.join(__dirname, '../client/vite-project/dist/index.html'));
}


ipcMain.on("open-all-project-items", async (event, projectId) => {
  const project = await getWorkspaceById(projectId);
  console.log("Project to open items for:", projectId, project);

  if (!project) {
    console.error(`Project not found: ${projectId}`);
    return;
  }

  const paths = project.filePaths;
  const links = project.webLinks;

  for (const pathItem of paths) {
    try {

      shell.openPath(pathItem.path).catch(err => console.error(err));
    } catch (error) {
      console.error(`Failed to open path ${pathItem.path}:`, error);
    }
  }

  for (const linkItem of links) {
    try {
      shell.openExternal(linkItem.url).catch(err => console.error(err));
    } catch (error) {
      console.error(`Failed to open link ${linkItem.url}:`, error);
    }
  }
});

app.whenReady().then(() => {
  startServer();
  createWindow();
}).catch((e) => console.error("Failed to start server:", e));