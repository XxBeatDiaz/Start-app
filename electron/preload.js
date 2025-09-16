import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openAllProjectItems: (projectId) =>
    ipcRenderer.send("open-all-project-items", projectId),
});
