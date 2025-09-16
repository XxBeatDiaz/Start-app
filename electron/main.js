import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { app, BrowserWindow, shell, ipcMain } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getResourcePath(relativePath) {
  // אם זה build, מחזיר את הנתיב בתוך resources
  return path.join(app.isPackaged ? process.resourcesPath : __dirname, relativePath);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreenable: true,
    show: false, // נסה להסתיר עד שה-html נטען
    icon: getResourcePath('./assets/Logo.png'),
    webPreferences: {
      preload: getResourcePath('./preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // נתיב ל-React build
  const indexPath = app.isPackaged
    ? path.join(process.resourcesPath, 'app', 'dist', 'index.html') // build path
    : path.join(__dirname, '../client/vite-project/dist/index.html'); // dev path

  win.loadFile(indexPath)
    .then(() => {
      win.show(); // מראה את החלון אחרי טעינת ה-html
      // win.webContents.openDevTools(); // אם רוצים לבדוק
    })
    .catch(err => console.error("Failed to load index.html:", err));

  return win;
}

// הפעלת השרת
async function initServer() {
  const serverPath = getResourcePath('../server/app.js');
  const { default: startServer } = await import(pathToFileURL(serverPath).href);
  startServer();
}

// טעינת DAL
async function getWorkspaceDAL() {
  const dalPath = getResourcePath('../server/dal/crudWorkSpace.js');
  return await import(pathToFileURL(dalPath).href);
}

// IPC
ipcMain.on("open-all-project-items", async (event, projectId) => {
  const { getWorkspaceById } = await getWorkspaceDAL();
  const project = await getWorkspaceById(projectId);
  if (!project) {
    console.error(`Project not found: ${projectId}`);
    return;
  }

  for (const pathItem of project.filePaths) {
    try { shell.openPath(pathItem.path).catch(console.error); } 
    catch (e) { console.error(e); }
  }

  for (const linkItem of project.webLinks) {
    try { shell.openExternal(linkItem.url).catch(console.error); } 
    catch (e) { console.error(e); }
  }
});

app.whenReady().then(async () => {
  await initServer();
  createWindow();
}).catch(e => console.error("Failed to start app:", e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
