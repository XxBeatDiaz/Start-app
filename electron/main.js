import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, shell, ipcMain } from 'electron'
import startServer from '../server/app.js';
import { getWorkspaceById } from '../server/dal/crudWorkspace.js';
import { getLinkById } from '../server/dal/crudLink.js';
import { getPathById } from '../server/dal/crudPath.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreenable: true,
    icon: path.join(__dirname, './assets/Logo.png')
  });
  console.log(path.join(__dirname, '../client/vite-project/dist/index.html'));

  win.loadFile(path.join(__dirname, '../client/vite-project/dist/index.html'));
}


ipcMain.on("open-all-project-items", async (event, projectId) => {
  const project = await getWorkspaceById(projectId);
  if (!project) {
    console.error(`Project not found: ${projectId}`);
    return;
  }

  const links = project.links?.map(id => getLinkById(id)).filter(Boolean) || [];
  const paths = project.paths?.map(id => getPathById(id)).filter(Boolean) || [];

  links.forEach(link => {
    shell.openExternal(link.url).catch(err => console.error(`Error opening ${link.url}:`, err));
  });

  paths.forEach(path => {
    shell.openPath(path.path).then(err => {
      if (err) console.error(`Error opening ${path.path}:`, err);
    });
  });
});

app.whenReady().then(() => {
  startServer();
  createWindow();
}).catch((e) => console.error("Failed to start server:", e));