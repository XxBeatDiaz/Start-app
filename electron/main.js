import { app, BrowserWindow } from 'electron'
import * as backend from '../server/app.js'

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    icon: __dirname + '/assets/Logo.png'
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  backend.start();
  createWindow();
});