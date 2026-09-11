"use client";
import { useState } from 'react';
import { createToolboxItem, updateToolboxItem } from '../../actions/toolboxActions';
import { supabase } from '../../../lib/supabase';

export default function ToolboxModal({ isOpen, onClose, item = null, categories = [] }: any) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [existingIconUrl, setExistingIconUrl] = useState<string | null>(item?.iconUrl || null);

  if (!isOpen) return null;

  async function uploadIcon(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `icon-${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `toolbox/${fileName}`;

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
      return publicUrlData.publicUrl;
    }
    return '';
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let finalIconUrl = existingIconUrl;

      if (file) {
        finalIconUrl = await uploadIcon(file);
      }

      if (finalIconUrl) {
        formData.set('iconUrl', finalIconUrl);
      } else {
        formData.set('iconUrl', '');
      }

      if (item) {
        await updateToolboxItem(item.id, formData);
      } else {
        await createToolboxItem(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving toolbox item. Check console for details.');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gh-surface border border-gh-border rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gh-border shrink-0">
          <h3 className="text-lg font-bold text-gh-text">{item ? 'Edit Item' : 'New Toolbox Item'}</h3>
          <button onClick={onClose} className="text-gh-text-muted hover:text-gh-text">&times;</button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          <form id="toolbox-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Name (e.g. React)</label>
              <input name="name" defaultValue={item?.name} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
            </div>
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Category</label>
              <select name="categoryId" defaultValue={item?.categoryId || (categories[0]?.id)} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text">
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="p-4 border border-dashed border-gh-border rounded-md bg-gh-canvas">
              <label className="block text-sm font-bold text-gh-text mb-2">Tech Icon (SVG/PNG)</label>
              
              {/* Existing Image Preview */}
              {existingIconUrl && !file && (
                <div className="mb-4">
                  <p className="text-xs text-gh-text-muted mb-2 font-mono">Current Icon:</p>
                  <div className="relative w-16 h-16 p-2 rounded border border-gh-border overflow-hidden group bg-gh-canvas flex items-center justify-center">
                    <img src={existingIconUrl} alt="Icon Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => setExistingIconUrl(null)}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                        title="Remove icon"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm text-gh-text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent-blue/10 file:text-accent-blue hover:file:bg-accent-blue/20 cursor-pointer"
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gh-border shrink-0 bg-gh-surface">
          <button type="button" onClick={onClose} className="dev-btn text-sm">Cancel</button>
          <button type="submit" form="toolbox-form" disabled={loading} className="dev-btn border-accent-green/50 text-accent-green hover:border-accent-green text-sm flex items-center gap-2">
            {loading && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
            {loading ? 'Saving...' : 'Save Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
