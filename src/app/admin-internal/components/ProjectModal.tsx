"use client";
import { useState } from 'react';
import { createProject, updateProject } from '../../actions/projectActions';
import { supabase } from '../../../lib/supabase';

export default function ProjectModal({ isOpen, onClose, project = null }: any) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  
  // Parse existing screenshots safely
  const initialScreenshots = (() => {
    if (!project?.screenshots) return [];
    if (typeof project.screenshots === 'string') {
      try { return JSON.parse(project.screenshots); } catch(e) { return []; }
    }
    return project.screenshots;
  })();
  const [existingScreenshots, setExistingScreenshots] = useState<string[]>(initialScreenshots);

  if (!isOpen) return null;

  async function uploadImages(fileList: FileList): Promise<string[]> {
    const uploadedUrls: string[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (error) {
        console.error('Upload Error:', error);
        throw error;
      }

      if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(filePath);
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }
    return uploadedUrls;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let newImageUrls: string[] = [];
      if (files && files.length > 0) {
        newImageUrls = await uploadImages(files);
      }

      // Combine staged existing screenshots with new uploaded images
      let finalScreenshots = [...existingScreenshots, ...newImageUrls];
      formData.set('screenshots', JSON.stringify(finalScreenshots));

      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving project. Check console for details.');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gh-surface border border-gh-border rounded-lg shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gh-border shrink-0">
          <h3 className="text-lg font-bold text-gh-text">{project ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={onClose} className="text-gh-text-muted hover:text-gh-text">&times;</button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Title</label>
                <input name="title" defaultValue={project?.title} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Category</label>
                <input name="category" defaultValue={project?.category} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Status</label>
                <select name="status" defaultValue={project?.status || 'Completed'} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text">
                  <option value="Completed">Completed</option>
                  <option value="Production">Production</option>
                  <option value="Research">Research</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Date (e.g. 2023)</label>
                <input name="date" defaultValue={project?.date} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
              </div>
            </div>
            
            {/* Extended Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Repo URL</label>
                <input name="repoUrl" defaultValue={project?.repoUrl} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Tags (comma separated)</label>
                <input name="tags" defaultValue={Array.isArray(project?.tags) ? project.tags.join(', ') : project?.tags} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" placeholder="React, Next.js, Tailwind" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Highlights (comma separated)</label>
                <input name="highlights" defaultValue={Array.isArray(project?.highlights) ? project.highlights.join(', ') : project?.highlights} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" placeholder="Feature A, Feature B, Feature C" />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Short Description (Card View)</label>
                <input name="shortDescription" defaultValue={project?.shortDescription} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Detailed Overview (Detail Page)</label>
                <textarea name="overview" defaultValue={project?.overview} required rows={4} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text"></textarea>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Code Language</label>
                <input name="codeLanguage" defaultValue={project?.codeLanguage || 'javascript'} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-mono text-gh-text-muted mb-1">Code Snippet (Optional)</label>
                <textarea name="codeSnippet" defaultValue={project?.codeSnippet} rows={5} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text font-mono"></textarea>
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 border border-dashed border-gh-border rounded-md bg-gh-canvas">
              <label className="block text-sm font-bold text-gh-text mb-2">Project Screenshots</label>
              
              {/* Existing Images Preview */}
              {existingScreenshots.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gh-text-muted mb-2 font-mono">Existing Images ({existingScreenshots.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {existingScreenshots.map((url: string, idx: number) => (
                      <div key={idx} className="relative w-20 h-20 rounded border border-gh-border overflow-hidden group">
                        <img src={url} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => setExistingScreenshots(prev => prev.filter(u => u !== url))}
                            className="text-red-400 hover:text-red-300 bg-red-900/30 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="w-full text-sm text-gh-text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent-blue/10 file:text-accent-blue hover:file:bg-accent-blue/20 cursor-pointer"
              />
              <p className="text-[10px] text-gh-text-muted mt-2 font-mono">New images will be appended to existing ones.</p>
            </div>

          </form>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gh-border shrink-0 bg-gh-surface">
          <button type="button" onClick={onClose} className="dev-btn text-sm">Cancel</button>
          <button type="submit" form="project-form" disabled={loading} className="dev-btn-primary text-sm flex items-center gap-2">
            {loading && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
            {loading ? 'Saving & Uploading...' : 'Save Project'}
          </button>
        </div>
      </div>
    </div>
  );
}
