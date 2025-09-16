const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
  openAllProjectItems: (projectId) => {
    ipcRenderer.send("open-all-project-items", projectId);
    console.log("Requested to open all items for project:", projectId);
  }
});
