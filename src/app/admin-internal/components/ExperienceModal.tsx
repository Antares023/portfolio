"use client";
import { useState } from 'react';
import { createExperience, updateExperience } from '../../actions/experienceActions';

export default function ExperienceModal({ isOpen, onClose, experience = null }: any) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (experience) {
        await updateExperience(experience.id, formData);
      } else {
        await createExperience(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving experience');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gh-surface border border-gh-border rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gh-border">
          <h3 className="text-lg font-bold text-gh-text">{experience ? 'Edit Experience' : 'New Experience'}</h3>
          <button onClick={onClose} className="text-gh-text-muted hover:text-gh-text">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Role (e.g. Frontend Dev)</label>
              <input name="role" defaultValue={experience?.role} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
            </div>
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Company</label>
              <input name="company" defaultValue={experience?.company} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
            </div>
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Duration (e.g. 2021 - Present)</label>
              <input name="duration" defaultValue={experience?.duration} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text" />
            </div>
            <div>
              <label className="block text-xs font-mono text-gh-text-muted mb-1">Type</label>
              <select name="type" defaultValue={experience?.type || 'Work'} required className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text">
                <option value="Work">Work</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-gh-text-muted mb-1">Description</label>
            <textarea name="description" defaultValue={experience?.description} required rows={3} className="w-full bg-gh-canvas border border-gh-border rounded-md px-3 py-2 text-sm text-gh-text"></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gh-border">
            <button type="button" onClick={onClose} className="dev-btn text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="dev-btn border-accent-purple/50 text-accent-purple hover:border-accent-purple text-sm">
              {loading ? 'Saving...' : 'Save Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
