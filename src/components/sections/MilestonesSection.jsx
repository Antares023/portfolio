import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import MilestoneItem from '../ui/MilestoneItem';
import { projects } from '../../data/projects';
import Reveal from '../ui/Reveal';

function SectionAccentLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div
      ref={ref}
      className={`w-10 h-[2px] bg-accent-purple mt-3 rounded-full ${isInView ? 'accent-line-visible' : 'accent-line'}`}
    />
  );
}

export default function MilestonesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter and sort the projects
  const filteredProjects = projects
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <section id="milestones" className="py-16 border-t border-gh-border/60 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <Reveal>
          <div>
            <span className="text-accent-purple font-mono text-xs uppercase tracking-wider block mb-1">
              // Roadmap & Timeline
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
              Projects & Milestones
            </h2>
            <p className="text-gh-text-muted text-xs md:text-sm mt-1 max-w-xl">
              A chronological timeline of major releases, research prototypes, and software developments.
            </p>
            <SectionAccentLine />
          </div>
        </Reveal>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Category Dropdown Filter */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full md:w-56 flex items-center justify-between gap-3 bg-gh-surface/60 backdrop-blur-md border px-5 py-2.5 rounded-xl text-sm font-semibold text-gh-text transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${
                isDropdownOpen 
                  ? 'border-accent-purple/80 bg-gh-surface shadow-[0_4px_20px_rgba(168,85,247,0.15)]' 
                  : 'border-gh-border/60 hover:border-accent-purple/50 hover:bg-gh-surface'
              }`}
            >
              <span className="truncate">{activeCategory}</span>
              <svg 
                className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent-purple' : 'text-gh-text-muted'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute z-20 w-full mt-3 bg-[#161b22]/95 backdrop-blur-xl border border-[#30363d]/80 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden ring-1 ring-white/5"
                >
                  <div className="py-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                          activeCategory === cat
                            ? 'bg-accent-purple/15 text-accent-purple border-l-2 border-accent-purple'
                            : 'text-gh-text-muted hover:bg-gh-surface hover:text-gh-text border-l-2 border-transparent'
                        }`}
                      >
                        {activeCategory === cat && (
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={activeCategory === cat ? '' : 'pl-6'}>{cat}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center justify-center p-2.5 h-10 w-10 shrink-0 bg-gh-surface/60 backdrop-blur-md border border-gh-border/60 hover:border-accent-purple/50 rounded-xl text-gh-text-muted hover:text-accent-purple hover:bg-gh-surface transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            title={`Sort by ${sortOrder === 'newest' ? 'Oldest First' : 'Newest First'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sortOrder === 'newest' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 4l-4 4m0 0l-4-4m4 4V4" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-2 md:pl-4">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <MilestoneItem
              key={project.id}
              project={project}
              index={index}
              isLast={index === filteredProjects.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
