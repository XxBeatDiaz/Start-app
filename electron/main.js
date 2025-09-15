import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow } from 'electron'
import startServer from '../server/app.js';


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

app.whenReady().then(() => {
  startServer();
  createWindow();
}).catch((e) => console.error("Failed to start server:", e));