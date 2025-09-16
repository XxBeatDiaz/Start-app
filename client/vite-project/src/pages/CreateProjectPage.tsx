import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useProjects } from '../context/ProjectsContext';
import type { filePaths, Project, webLinks } from '../types';

export default function CreateProjectPage() {
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filePathsState, setFilePathsState] = useState<filePaths[]>([]);
  const [webLinksState, setWebLinksState] = useState<webLinks[]>([]);

  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const addFilePath = () => {
    if (!fileName.trim() || !filePath.trim()) return;
    const newFile: filePaths = { name: fileName, path: filePath, createdAt: Date.now() };
    setFilePathsState(prev => [...prev, newFile]);
    setFileName(''); setFilePath('');
  };

  const addWebLink = () => {
    if (!linkName.trim() || !linkUrl.trim()) return;
    const newLink: webLinks = { name: linkName, url: linkUrl, createdAt: Date.now() };
    setWebLinksState(prev => [...prev, newLink]);
    setLinkName(''); setLinkUrl('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newProject: Project = {
      _id: crypto.randomUUID(),
      name,
      description,
      filePaths: filePathsState,
      webLinks: webLinksState,
      createdAt: Date.now(),
    };
    await addProject(newProject);
    navigate(`/projects/${newProject._id}`);
  };

  return (
    <div className="create-page">
      <h1>Create New Project</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Project name</label>
          <input type="text" placeholder="Project name" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="section">
          <h3>File Paths</h3>
          <div className="form-group-inline">
            <input type="text" placeholder="File name" value={fileName} onChange={e => setFileName(e.target.value)} />
            <input type="text" placeholder="File path" value={filePath} onChange={e => setFilePath(e.target.value)} />
            <button type="button" className="btn btn-secondary" onClick={addFilePath}>Add File</button>
          </div>
          <ul className="list">
            {filePathsState.map((f, idx) => <li key={idx} className="list-item">{f.name} — <span className="muted">{f.path}</span></li>)}
          </ul>
        </div>

        <div className="section">
          <h3>Web Links</h3>
          <div className="form-group-inline">
            <input type="text" placeholder="Link name" value={linkName} onChange={e => setLinkName(e.target.value)} />
            <input type="text" placeholder="URL" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} />
            <button type="button" className="btn btn-secondary" onClick={addWebLink}>Add Link</button>
          </div>
          <ul className="list">
            {webLinksState.map((w, idx) => <li key={idx} className="list-item"><a href={w.url} target="_blank" rel="noreferrer">{w.name}</a></li>)}
          </ul>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Project</button>
        </div>
      </form>
    </div>
  );
}
