import { useParams, useNavigate } from "react-router";
import { useProjects } from "../context/ProjectsContext";
import { useEffect, useState } from "react";
import type { Project, filePaths, webLinks } from "../types";

type LocalLink = webLinks & { _uid: string };
type LocalFile = filePaths & { _uid: string };

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, deleteProject, updateProject } = useProjects();

  const project: Project | undefined = getProjectById(id);

  const [name, setName] = useState<string>(project?.name || "");
  const [description, setDescription] = useState<string>(
    project?.description || ""
  );
  const [links, setLinks] = useState<LocalLink[]>(() =>
    (project?.webLinks || []).map((l) => ({ ...l, _uid: crypto.randomUUID() }))
  );
  const [files, setFiles] = useState<LocalFile[]>(() =>
    (project?.filePaths || []).map((f) => ({ ...f, _uid: crypto.randomUUID() }))
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    setName(project?.name || "");
    setDescription(project?.description || "");
    setLinks(
      (project?.webLinks || []).map((l) => ({
        ...l,
        _uid: crypto.randomUUID(),
      }))
    );
    setFiles(
      (project?.filePaths || []).map((f) => ({
        ...f,
        _uid: crypto.randomUUID(),
      }))
    );
    setEditing(false);
    setChanged(false);
  }, [project?._id]);

  if (!project) return <p>Project not found.</p>;

  const handleAddLink = () => {
    const newLink: LocalLink = {
      name: "",
      url: "",
      createdAt: Date.now(),
      _uid: crypto.randomUUID(),
    };
    setLinks((prev) => [...prev, newLink]);
    setChanged(true);
  };
  const handleRemoveLink = (uid: string) => {
    setLinks((prev) => prev.filter((l) => l._uid !== uid));
    setChanged(true);
  };

  const handleAddFile = () => {
    const newFile: LocalFile = {
      name: "",
      path: "",
      createdAt: Date.now(),
      _uid: crypto.randomUUID(),
    };
    setFiles((prev) => [...prev, newFile]);
    setChanged(true);
  };
  const handleRemoveFile = (uid: string) => {
    setFiles((prev) => prev.filter((f) => f._uid !== uid));
    setChanged(true);
  };

  const handleSave = async () => {
    if (!project._id) return;
    const cleanLinks: webLinks[] = links.map(({ _uid, ...rest }) => ({
      ...rest,
    }));
    const cleanFiles: filePaths[] = files.map(({ _uid, ...rest }) => ({
      ...rest,
    }));

    const updated: Project = {
      ...project,
      name,
      description,
      updatedAt: Date.now(),
      webLinks: cleanLinks,
      filePaths: cleanFiles,
    };
    await updateProject(updated);
    setChanged(false);
    setEditing(false);
  };

  return (
    <div className="project-container">
      <header className="project-header">
        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setChanged(true);
              }}
            />
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setChanged(true);
              }}
            />
          </>
        ) : (
          <>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </>
        )}

        <div className="header-actions">
          <button
            className="btn-secondary small"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : <img src="edit.png" alt="edit" width={30} />}
          </button>
          <button
            className="danger small"
            onClick={() => {
              if (project._id) {
                deleteProject(project._id);
                navigate("/");
              }
            }}
          >
            Delete Project
          </button>
          <button
            className="btn-secondary small"
            onClick={() => {
              if (project._id) {
                window.electronAPI.openAllProjectItems(project._id);
              }
            }}
          >
            Open all
          </button>
        </div>
      </header>

      <section className="links-list">
        <h3>
          Links{" "}
          {editing && (
            <button className="btn-icon" onClick={handleAddLink}>
              ➕
            </button>
          )}
        </h3>
        {links.length > 0 ? (
          <ul>
            {links.map((link) => (
              <li key={link._uid} className="item-row">
                {editing ? (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={link.name}
                      onChange={(e) => {
                        setLinks((prev) =>
                          prev.map((l) =>
                            l._uid === link._uid
                              ? { ...l, name: e.target.value }
                              : l
                          )
                        );
                        setChanged(true);
                      }}
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        setLinks((prev) =>
                          prev.map((l) =>
                            l._uid === link._uid
                              ? { ...l, url: e.target.value }
                              : l
                          )
                        );
                        setChanged(true);
                      }}
                    />
                    <button onClick={() => handleRemoveLink(link._uid)}>
                      ➖
                    </button>
                  </>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name || link.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No links yet.</p>
        )}
      </section>

      <section className="files-list">
        <h3>
          Files{" "}
          {editing && (
            <button className="btn-icon" onClick={handleAddFile}>
              ➕
            </button>
          )}
        </h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file._uid} className="item-row">
                {editing ? (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={file.name}
                      onChange={(e) => {
                        setFiles((prev) =>
                          prev.map((f) =>
                            f._uid === file._uid
                              ? { ...f, name: e.target.value }
                              : f
                          )
                        );
                        setChanged(true);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Path"
                      value={file.path}
                      onChange={(e) => {
                        setFiles((prev) =>
                          prev.map((f) =>
                            f._uid === file._uid
                              ? { ...f, path: e.target.value }
                              : f
                          )
                        );
                        setChanged(true);
                      }}
                    />
                    <button onClick={() => handleRemoveFile(file._uid)}>
                      ➖
                    </button>
                  </>
                ) : (
                  <span
                    onClick={() => (window as any).api?.openPath?.(file.path)}
                    className="file-link"
                  >
                    {file.name || file.path}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No files yet.</p>
        )}
      </section>

      {changed && (
        <div className="save-bar">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
