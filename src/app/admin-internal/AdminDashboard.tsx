"use client";
import { useState } from 'react';
import ProjectModal from './components/ProjectModal';
import ToolboxModal from './components/ToolboxModal';
import ExperienceModal from './components/ExperienceModal';
import CertificateModal from './components/CertificateModal';
import { deleteProject } from '../actions/projectActions';
import { deleteToolboxItem } from '../actions/toolboxActions';
import { deleteExperience } from '../actions/experienceActions';
import { deleteCertificate } from '../actions/certificateActions';

type AdminDashboardProps = {
  initialProjects: any[];
  initialToolboxCategories: any[];
  initialToolboxItems: any[];
  initialExperiences: any[];
  initialCertificates: any[];
};

export default function AdminDashboard({
  initialProjects,
  initialToolboxCategories,
  initialToolboxItems,
  initialExperiences,
  initialCertificates
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'toolbox' | 'experience' | 'certificates'>('projects');
  
  // Modal states for Projects
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Modal states for Toolbox
  const [isToolboxModalOpen, setIsToolboxModalOpen] = useState(false);
  const [editingToolboxItem, setEditingToolboxItem] = useState<any>(null);

  // Modal states for Experience
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  // Modal states for Certificates
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<any>(null);

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleDeleteToolboxItem = async (id: string) => {
    if (confirm('Are you sure you want to delete this toolbox item?')) {
      await deleteToolboxItem(id);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await deleteExperience(id);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      await deleteCertificate(id);
    }
  };

  return (
    <div className="dev-card bg-gh-surface/80 border border-gh-border p-6 min-h-[600px]">
      {/* Tabs */}
      <div className="flex border-b border-gh-border/60 mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
            activeTab === 'projects' ? 'border-accent-blue text-accent-blue font-bold' : 'border-transparent text-gh-text-muted hover:text-gh-text'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('toolbox')}
          className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
            activeTab === 'toolbox' ? 'border-accent-green text-accent-green font-bold' : 'border-transparent text-gh-text-muted hover:text-gh-text'
          }`}
        >
          Toolbox Items
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
            activeTab === 'experience' ? 'border-accent-purple text-accent-purple font-bold' : 'border-transparent text-gh-text-muted hover:text-gh-text'
          }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
            activeTab === 'certificates' ? 'border-accent-blue text-accent-blue font-bold' : 'border-transparent text-gh-text-muted hover:text-gh-text'
          }`}
        >
          Certificates
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gh-text font-mono">Manage Projects</h2>
              <button 
                onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
                className="dev-btn-primary text-xs font-mono"
              >
                + New Project
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gh-border/60 text-gh-text-muted text-sm font-mono">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialProjects.map((p) => (
                    <tr key={p.id} className="border-b border-gh-border/30 hover:bg-gh-surface/50">
                      <td className="py-3 px-4 text-gh-text">{p.title}</td>
                      <td className="py-3 px-4 text-gh-text-muted text-sm">{p.category}</td>
                      <td className="py-3 px-4">
                        <span className="dev-badge text-[10px]">{p.status}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => handleEditProject(p)} className="text-accent-blue hover:underline text-sm mr-3">Edit</button>
                        <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {initialProjects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gh-text-muted text-sm">No projects found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'toolbox' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gh-text font-mono">Manage Toolbox</h2>
              <button 
                onClick={() => { setEditingToolboxItem(null); setIsToolboxModalOpen(true); }}
                className="dev-btn border-accent-green/50 text-accent-green hover:border-accent-green text-xs font-mono"
              >
                + New Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gh-border/60 text-gh-text-muted text-sm font-mono">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialToolboxItems.map((item) => {
                    const category = initialToolboxCategories.find(c => c.id === item.categoryId);
                    return (
                      <tr key={item.id} className="border-b border-gh-border/30 hover:bg-gh-surface/50">
                        <td className="py-3 px-4 text-gh-text flex items-center gap-2">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-gh-text-muted text-sm">{category?.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => { setEditingToolboxItem(item); setIsToolboxModalOpen(true); }} className="text-accent-blue hover:underline text-sm mr-3">Edit</button>
                          <button onClick={() => handleDeleteToolboxItem(item.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                  {initialToolboxItems.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gh-text-muted text-sm">No toolbox items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gh-text font-mono">Manage Experience</h2>
              <button 
                onClick={() => { setEditingExperience(null); setIsExperienceModalOpen(true); }}
                className="dev-btn border-accent-purple/50 text-accent-purple hover:border-accent-purple text-xs font-mono"
              >
                + Add Experience
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gh-border/60 text-gh-text-muted text-sm font-mono">
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialExperiences.map((exp) => (
                    <tr key={exp.id} className="border-b border-gh-border/30 hover:bg-gh-surface/50">
                      <td className="py-3 px-4 text-gh-text font-semibold">{exp.role}</td>
                      <td className="py-3 px-4 text-gh-text-muted text-sm">{exp.company}</td>
                      <td className="py-3 px-4 text-gh-text-muted text-sm">{exp.duration}</td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => { setEditingExperience(exp); setIsExperienceModalOpen(true); }} className="text-accent-blue hover:underline text-sm mr-3">Edit</button>
                        <button onClick={() => handleDeleteExperience(exp.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {initialExperiences.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gh-text-muted text-sm">No experience found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gh-text font-mono">Manage Certificates</h2>
              <button 
                onClick={() => { setEditingCertificate(null); setIsCertificateModalOpen(true); }}
                className="dev-btn-primary bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border-none text-xs font-mono"
              >
                + Add Certificate
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gh-border/60 text-gh-text-muted text-sm font-mono">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Issuer</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialCertificates.map((cert) => (
                    <tr key={cert.id} className="border-b border-gh-border/30 hover:bg-gh-surface/50">
                      <td className="py-3 px-4 text-gh-text font-semibold">{cert.title}</td>
                      <td className="py-3 px-4 text-gh-text-muted text-sm">{cert.issuer}</td>
                      <td className="py-3 px-4 text-gh-text-muted text-sm">{cert.date}</td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => { setEditingCertificate(cert); setIsCertificateModalOpen(true); }} className="text-accent-blue hover:underline text-sm mr-3">Edit</button>
                        <button onClick={() => handleDeleteCertificate(cert.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {initialCertificates.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gh-text-muted text-sm">No certificates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        project={editingProject} 
      />
      
      <ToolboxModal 
        isOpen={isToolboxModalOpen} 
        onClose={() => setIsToolboxModalOpen(false)} 
        item={editingToolboxItem} 
        categories={initialToolboxCategories}
      />
      
      <ExperienceModal 
        isOpen={isExperienceModalOpen} 
        onClose={() => setIsExperienceModalOpen(false)} 
        experience={editingExperience} 
      />
      
      <CertificateModal 
        isOpen={isCertificateModalOpen} 
        onClose={() => setIsCertificateModalOpen(false)} 
        certificate={editingCertificate} 
      />
    </div>
  );
}
