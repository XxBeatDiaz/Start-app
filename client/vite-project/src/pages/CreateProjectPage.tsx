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
    const newFile: filePaths = { _id: crypto.randomUUID(), name: fileName, path: filePath, createdAt: Date.now() };
    setFilePathsState(prev => [...prev, newFile]);
    setFileName(''); setFilePath('');
  };

  const addWebLink = () => {
    if (!linkName.trim() || !linkUrl.trim()) return;
    const newLink: webLinks = { _id: crypto.randomUUID(), name: linkName, url: linkUrl, createdAt: Date.now() };
    setWebLinksState(prev => [...prev, newLink]);
    setLinkName(''); setLinkUrl('');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newProject: Project = {
      _id: crypto.randomUUID(),
      name,
      description,
      filePaths: filePathsState.map(f => f._id!),
      webLinks: webLinksState.map(w => w._id!),
      createdAt: Date.now(),
    };
    addProject(newProject);
    navigate(`/projects/${newProject._id}`);
  };

  return (
    <div className="create-page">
      <h1>Create New Project</h1>
      <form onSubmit={submit}>
        <input type="text" placeholder="Project name" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

        <div>
          <h3>File Paths</h3>
          <input type="text" placeholder="File name" value={fileName} onChange={e => setFileName(e.target.value)} />
          <input type="text" placeholder="File path" value={filePath} onChange={e => setFilePath(e.target.value)} />
          <button type="button" onClick={addFilePath}>Add File</button>
          <ul>
            {filePathsState.map(f => <li key={f._id}>{f.name} — {f.path}</li>)}
          </ul>
        </div>

        <div>
          <h3>Web Links</h3>
          <input type="text" placeholder="Link name" value={linkName} onChange={e => setLinkName(e.target.value)} />
          <input type="text" placeholder="URL" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} />
          <button type="button" onClick={addWebLink}>Add Link</button>
          <ul>
            {webLinksState.map(w => <li key={w._id}><a href={w.url} target="_blank" rel="noreferrer">{w.name}</a></li>)}
          </ul>
        </div>

        <button type="submit" className="btn-primary">Save Project</button>
      </form>
    </div>
  );
}
