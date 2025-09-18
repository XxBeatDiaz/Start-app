import { useParams, useNavigate } from "react-router";
import { useProjects } from "../context/ProjectsContext";
import { useEffect, useState } from "react";
import type { Project, webLinks, filePaths } from "../types";
import "../styles/EditProjectPage.css";
import "../styles/common.css";

type LocalLink = webLinks & { _uid: string };
type LocalFile = filePaths & { _uid: string };

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, updateProject } = useProjects();
  const project: Project | undefined = getProjectById(id);

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [links, setLinks] = useState<LocalLink[]>(() =>
    (project?.webLinks || []).map(l => ({ ...l, _uid: crypto.randomUUID() }))
  );
  const [files, setFiles] = useState<LocalFile[]>(() =>
    (project?.filePaths || []).map(f => ({ ...f, _uid: crypto.randomUUID() }))
  );
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setLinks((project.webLinks || []).map(l => ({ ...l, _uid: crypto.randomUUID() })));
      setFiles((project.filePaths || []).map(f => ({ ...f, _uid: crypto.randomUUID() })));
    }
  }, [project?._id]);

  if (!project) return <p>Project not found.</p>;

  const handleAddLink = () => {
    setLinks(prev => [...prev, { name: "", url: "", createdAt: Date.now(), _uid: crypto.randomUUID() }]);
    setChanged(true);
  };
  const handleRemoveLink = (uid: string) => {
    setLinks(prev => prev.filter(l => l._uid !== uid));
    setChanged(true);
  };

  const handleAddFile = () => {
    setFiles(prev => [...prev, { name: "", path: "", createdAt: Date.now(), _uid: crypto.randomUUID() }]);
    setChanged(true);
  };
  const handleRemoveFile = (uid: string) => {
    setFiles(prev => prev.filter(f => f._uid !== uid));
    setChanged(true);
  };

  const handleSave = async () => {
    if (!project._id) return;
    const cleanLinks: webLinks[] = links.map(({ _uid, ...rest }) => ({ ...rest }));
    const cleanFiles: filePaths[] = files.map(({ _uid, ...rest }) => ({ ...rest }));
    const updated: Project = { ...project, name, description, webLinks: cleanLinks, filePaths: cleanFiles, updatedAt: Date.now() };
    await updateProject(updated);
    navigate(`/projects/${project._id}`);
  };

  return (
    <div className="edit-project">
      <h1>Edit Project</h1>
      <div className="form-group">
        <label>Name</label>
        <input type="text" value={name} onChange={e => { setName(e.target.value); setChanged(true); }} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={description} onChange={e => { setDescription(e.target.value); setChanged(true); }} />
      </div>

      <section className="edit-links">
        <h3>Links <button type="button" onClick={handleAddLink}><img src="plus.png" alt="plus" width={30} /></button></h3>
        {links.map(l => (
          <div key={l._uid} className="form-group-inline">
            <input type="text" placeholder="Name" value={l.name} onChange={e => { setLinks(prev => prev.map(x => x._uid === l._uid ? { ...x, name: e.target.value } : x)); setChanged(true); }} />
            <input type="url" placeholder="URL" value={l.url} onChange={e => { setLinks(prev => prev.map(x => x._uid === l._uid ? { ...x, url: e.target.value } : x)); setChanged(true); }} />
            <button type="button" onClick={() => handleRemoveLink(l._uid)}><img src="minus.png" alt="minus" width={30} /></button>
          </div>
        ))}
      </section>

      <section className="edit-files">
                <h3>Files <button type="button" onClick={handleAddFile}><img src="plus.png" alt="plus" width={30} /></button></h3>
        {files.map(f => (
          <div key={f._uid} className="form-group-inline">
            <input type="text" placeholder="Name" value={f.name} onChange={e => { setFiles(prev => prev.map(x => x._uid === f._uid ? { ...x, name: e.target.value } : x)); setChanged(true); }} />
            <input type="text" placeholder="Path" value={f.path} onChange={e => { setFiles(prev => prev.map(x => x._uid === f._uid ? { ...x, path: e.target.value } : x)); setChanged(true); }} />
            <button type="button" onClick={() => handleRemoveFile(f._uid)}> <img src="minus.png" alt="minus" width={30} /></button>
          </div>
        ))}
      </section>

      {changed && (
        <div className="save-bar">
          <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}
