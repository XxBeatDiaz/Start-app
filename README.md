# Start App

**Start App** is a smart desktop application for managing projects and workspaces.  
It allows you to centralize all your important links, folders, and files in one place — and open them all with a single click.  

💡 While originally designed for developers, the app is flexible enough to be used by **anyone who wants to manage a workspace** — designers, students, content creators, musicians, and more.


## ✨ Features

*   Create and manage "Workspaces" to group projects.
*   Add, edit, and delete projects within each Workspace.
*   Manage relevant links and paths for each project.

## 💻 Tech Stack

The project is built with three main parts:

*   **Client:** [React](https://react.dev/) with [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/).
*   **Server:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/).
*   **Desktop App:** [Electron](https://www.electronjs.org/).

## 📂 Project Structure

```
Start-app/
├── client/              # Client-side code (React)
│   └── vite-project/
├── electron/            # Electron main configuration and code
└── server/              # Server-side code (Node.js/Express)
```

## 🚀 Setup and Run Instructions

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Install Dependencies

You need to install the dependencies in each of the main directories (`server`, `client/vite-project`, `electron`):

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client/vite-project
npm install

# Install Electron dependencies
cd ../../electron
npm install
```

### 2. Running the Project

Open 3 separate terminals and run the following commands, each in its respective directory:

1.  **Start the Server:**
    ```bash
    # Inside the server directory
    npm start
    ```
    The server will run on `http://localhost:3131`.

2.  **Start the Client (in development mode):**
    ```bash
    # Inside the client/vite-project directory
    npm run dev
    ```
    The Vite development server will run on `http://localhost:5173`.

3.  **Start the Electron App:**
    ```bash
    # Inside the electron directory
    npm start
    ```
    The application window will open and load the client.