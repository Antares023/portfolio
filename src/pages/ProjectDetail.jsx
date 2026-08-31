import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/projects';
import CodeBlock from '../components/ui/CodeBlock';
import LanguageDot from '../components/ui/LanguageDot';

export default function ProjectDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    if (activeTab === 'overview' && project?.screenshots?.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIdx(prev => (prev + 1) % project.screenshots.length);
      }, 3500); // auto-slide every 3.5s
      return () => clearInterval(timer);
    }
  }, [activeTab, project]);

  if (!project) return <Navigate to="/" />;

  // Build a simple language bar
  const mainLang = project.tags[0];

  return (
    <>
      <Helmet>
        <title>{project.title} · Antares023</title>
        <meta name="description" content={project.shortDescription} />
        <link rel="canonical" href={`https://emham.my.id/project/${project.id}`} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── Breadcrumb ─────────────────────── */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-accent-blue hover:underline font-mono">
            Antares023
          </Link>
          <span className="text-gh-text-muted">/</span>
          <span className="text-accent-blue font-mono font-semibold">
            {project.id}
          </span>
          <span className="ml-2 text-[10px] text-gh-text-muted border border-gh-border rounded-full px-2 py-0.5">
            Public
          </span>
        </div>

        {/* ── Tab bar ───────────── */}
        <div className="flex items-center gap-0 border-b border-gh-border mb-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
              activeTab === 'overview' 
                ? 'text-gh-text border-b-2 border-accent-orange font-medium' 
                : 'text-gh-text-muted hover:text-gh-text cursor-pointer'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.623-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"/>
            </svg>
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
              activeTab === 'code' 
                ? 'text-gh-text border-b-2 border-accent-orange font-medium' 
                : 'text-gh-text-muted hover:text-gh-text cursor-pointer'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm7.47 3.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06L10.69 8 9.22 6.53a.75.75 0 0 1 0-1.06Zm-4.94 0a.75.75 0 0 1 1.06 1.06L3.81 8l1.48 1.47a.75.75 0 0 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06Z"/>
            </svg>
            Code snippet
          </button>
        </div>

        {/* ── About Section ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* README-style content */}
            <div className="dev-card mb-8">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gh-border">
                <svg className="w-4 h-4 text-gh-text-muted" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.623-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z"/>
                </svg>
                <span className="text-sm font-semibold text-gh-text">README.md</span>
              </div>
              <h2 className="font-mono text-xl font-bold text-gh-text mb-3">
                {project.title}
              </h2>
              <p className="text-gh-text-muted text-sm leading-relaxed mb-6">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="dev-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic Tab Content */}
            <div className="mb-8">
              {activeTab === 'code' ? (
                <CodeBlock
                  code={project.codeSnippet}
                  language={project.codeLanguage}
                  filename={`src/main.${project.codeLanguage === 'javascript' ? 'js' : project.codeLanguage === 'python' ? 'py' : project.codeLanguage === 'cpp' ? 'cpp' : 'php'}`}
                />
              ) : (
                <div className="dev-card bg-gh-surface/40 p-4 border border-gh-border">
                  <div className="mb-4">
                    <h3 className="font-mono text-sm font-bold text-gh-text mb-2 border-b border-gh-border pb-2">Project Visual Overview</h3>
                  </div>
                  {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="overflow-hidden relative w-full rounded border border-gh-border shadow-md bg-gh-canvas group">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentImageIdx * 100}%)` }}
                      >
                        {project.screenshots.map((imgUrl, idx) => (
                          <img 
                            key={idx}
                            src={imgUrl} 
                            alt={`${project.title} Screenshot ${idx + 1}`} 
                            className="w-full h-[250px] sm:h-[400px] object-cover shrink-0"
                          />
                        ))}
                      </div>
                      
                      {/* Navigation Dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                        {project.screenshots.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIdx(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${currentImageIdx === idx ? 'bg-accent-blue scale-110' : 'bg-gh-canvas/80 hover:bg-gh-text-muted'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gh-canvas rounded border border-dashed border-gh-border text-gh-text-muted font-mono text-sm">
                      [ Screenshot Not Available ]
                    </div>
                  )}
                  
                  {project.highlights && (
                    <div className="mt-6">
                      <h4 className="font-mono text-xs font-bold text-accent-blue mb-3 uppercase tracking-wider">Key Highlights</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gh-text-muted">
                            <span className="text-accent-green mt-0.5">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gh-text mb-3">About</h3>
              <p className="text-gh-text-muted text-sm leading-relaxed mb-4">
                {project.shortDescription}
              </p>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="dev-btn w-full text-center inline-flex items-center justify-center gap-2 text-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold text-gh-text mb-3">Languages</h3>
              {/* Language progress bar */}
              <div className="w-full h-2 rounded-full overflow-hidden flex mb-3">
                <div className="h-full bg-lang-js flex-1"></div>
              </div>
              <div className="space-y-1.5">
                <LanguageDot language={mainLang} />
              </div>
            </div>

            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent-blue hover:underline text-sm font-mono"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"/>
              </svg>
              cd ~/projects
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
