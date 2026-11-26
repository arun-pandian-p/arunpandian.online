import React, { useState, useEffect, useRef } from 'react';
import {
  getProjects,
  saveProject,
  deleteProject,
  uploadGalleryPhoto,
  GalleryProject,
} from '../../lib/supabase';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Edit,
  Plus,
  Save,
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const AdminGalleryManager: React.FC = () => {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Edit / Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<GalleryProject> | null>(null);

  // Drag and drop / file upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjectsData = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      setErrorMessage('Failed to load gallery projects: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProject({
      title: '',
      problem: '',
      solution: '',
      architecture: '',
      category: 'Full Stack',
      image_url: '',
      github_link: '',
      live_link: '',
      tags: ['React', 'TypeScript', 'PostgreSQL'],
      published: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: GalleryProject) => {
    setEditingProject({ ...proj });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // Image Upload handler (supports drag & drop or file picker)
  const handleUploadImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, WebP).', true);
      return;
    }

    setUploadingImage(true);
    try {
      const publicUrl = await uploadGalleryPhoto(file);
      setEditingProject((prev) => (prev ? { ...prev, image_url: publicUrl } : null));
      showNotification('Photo uploaded successfully to Supabase Storage!');
    } catch (err: any) {
      showNotification('Failed to upload image: ' + err.message, true);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadImageFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadImageFile(e.dataTransfer.files[0]);
    }
  };

  // Multiple files drag & drop to add multiple projects or upload bulk
  const handleBulkDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;

    if (files.length === 1 && isModalOpen) {
      handleUploadImageFile(files[0]);
      return;
    }

    setUploadingImage(true);
    try {
      for (const file of files) {
        const publicUrl = await uploadGalleryPhoto(file);
        // Create a new project draft
        await saveProject({
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          problem: 'Uploaded via Gallery Drag-and-Drop photo manager.',
          image_url: publicUrl,
          published: true,
          tags: ['Portfolio', 'Gallery'],
        });
      }
      showNotification(`Uploaded ${files.length} photos successfully!`);
      await fetchProjectsData();
    } catch (err: any) {
      showNotification('Bulk upload error: ' + err.message, true);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) {
      showNotification('Project Title is required.', true);
      return;
    }

    setSaving(true);
    try {
      await saveProject(editingProject);
      showNotification('Project saved and reflected on public portfolio!');
      handleCloseModal();
      await fetchProjectsData();
    } catch (err: any) {
      showNotification('Failed to save project: ' + err.message, true);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteProject(id);
      showNotification(`Project "${title}" deleted successfully.`);
      await fetchProjectsData();
    } catch (err: any) {
      showNotification('Failed to delete project: ' + err.message, true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-primary" />
            <span>Gallery & Project Photos</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage project photos, upload via drag-and-drop, edit titles & descriptions, and sync to live portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjectsData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Refresh from Database"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project Photo</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Global Drag-and-Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleBulkDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging
            ? 'border-primary bg-primary/10 scale-[1.01]'
            : 'border-white/15 bg-[#0B0F15]/60 hover:border-white/30'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Drag and drop project photos here
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports multiple PNG, JPG, or WebP files · Direct upload to Supabase Storage
            </p>
          </div>
          {uploadingImage && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Uploading to assets bucket...</span>
            </div>
          )}
        </div>
      </div>

      {/* Project Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
          <span>Current Projects ({projects.length})</span>
          <span>Live on Portfolio</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#0B0F15] text-slate-400">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="font-semibold text-slate-300">No project photos found</p>
            <p className="text-xs mt-1">Click "Add New Project Photo" or drag photos above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-white/10 bg-[#0B0F15] overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all group shadow-lg"
              >
                {/* Photo Preview Thumbnail */}
                <div className="relative aspect-video bg-black/40 overflow-hidden border-b border-white/10">
                  {proj.image_url ? (
                    <img
                      src={proj.image_url}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 text-xs">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span>No preview image</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {proj.published && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/80 text-white text-[10px] font-mono font-medium backdrop-blur-xs">
                        Published
                      </span>
                    )}
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-primary/80 text-white text-[10px] font-mono font-medium backdrop-blur-xs">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {proj.problem || proj.summary || 'No description provided.'}
                    </p>
                  </div>

                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-mono self-center">
                          +{proj.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {proj.github_link && (
                        <a
                          href={proj.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="GitHub Link"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.live_link && (
                        <a
                          href={proj.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(proj)}
                        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Project & Photo"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0B0F15] p-6 sm:p-8 shadow-2xl text-slate-100 my-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <span>{editingProject.id ? 'Edit Project Photo' : 'Add Project Photo'}</span>
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              {/* Image Upload Zone inside modal */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Project Photo / Thumbnail
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/10'
                      : 'border-white/15 hover:border-primary/40 bg-black/30'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {editingProject.image_url ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <img
                        src={editingProject.image_url}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded-lg border border-white/10"
                      />
                      <div className="text-left flex-1">
                        <p className="text-xs font-semibold text-slate-200">Photo Attached</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-sm">
                          {editingProject.image_url}
                        </p>
                        <span className="text-xs text-primary font-medium mt-1 inline-block">
                          Click or drag a new image to replace
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 space-y-2">
                      <Upload className="w-6 h-6 mx-auto text-slate-400" />
                      <p className="text-xs text-slate-300">
                        Drag photo here, or <span className="text-primary font-medium">browse</span>
                      </p>
                      <p className="text-[10px] text-slate-500">Supports PNG, JPG, WebP</p>
                    </div>
                  )}

                  {uploadingImage && (
                    <div className="mt-2 text-xs text-primary animate-pulse font-mono">
                      Uploading to Supabase Storage...
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zappy – Restaurant SaaS Platform"
                    value={editingProject.title || ''}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, title: e.target.value } : null))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack, AI & Data Science"
                    value={editingProject.category || ''}
                    onChange={(e) =>
                      setEditingProject((prev) => (prev ? { ...prev, category: e.target.value } : null))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Description / Problem Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the project scope, architecture, or key results..."
                  value={editingProject.problem || ''}
                  onChange={(e) =>
                    setEditingProject((prev) => (prev ? { ...prev, problem: e.target.value } : null))
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React 19, TypeScript, Java 21, Spring Boot, PostgreSQL"
                  value={editingProject.tags ? editingProject.tags.join(', ') : ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                    setEditingProject((prev) => (prev ? { ...prev, tags } : null));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none font-mono"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={editingProject.github_link || ''}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev ? { ...prev, github_link: e.target.value } : null
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingProject.live_link || ''}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev ? { ...prev, live_link: e.target.value } : null
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev ? { ...prev, published: e.target.checked } : null
                      )
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary bg-black/40 border-white/20"
                  />
                  <span>Published on public portfolio</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={editingProject.featured ?? false}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev ? { ...prev, featured: e.target.checked } : null
                      )
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary bg-black/40 border-white/20"
                  />
                  <span>Feature on homepage</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
