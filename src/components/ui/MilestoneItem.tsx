"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageDot from './LanguageDot';

const STATUS_STYLE = {
  Production: 'bg-blue-500/10 text-accent-blue border-blue-500/30',
  Completed: 'bg-emerald-500/10 text-accent-green border-emerald-500/30',
  Research: 'bg-purple-500/10 text-accent-purple border-purple-500/30',
  default: 'bg-gh-surface text-gh-text-muted border-gh-border',
};

export default function MilestoneItem({ project, index = 0, isLast = false }: { project: any, index?: number, isLast?: boolean }) {
  const statusClass = STATUS_STYLE[project.status as keyof typeof STATUS_STYLE] || STATUS_STYLE.default;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Timeline Vertical Line */}
      {!isLast && (
        <div className="absolute left-[13px] md:left-[17px] top-[32px] bottom-[-24px] w-[2px] bg-gh-border group-hover:bg-accent-blue/40 transition-colors" />
      )}

      {/* Timeline Node Icon (Git Commit / Milestone Node) */}
      <motion.div 
        className="absolute left-0 md:left-1 top-1.5 w-7 h-7 rounded-full bg-gh-canvas border-2 border-gh-border flex items-center justify-center group-hover:border-accent-blue group-hover:shadow-[0_0_12px_rgba(88,166,255,0.4)] transition-all"
        whileHover={{ scale: [1, 1.3, 1], transition: { duration: 0.4 } }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-accent-blue group-hover:scale-125 transition-transform" />
      </motion.div>

      {/* Milestone Card */}
      <div className="dev-card bg-gh-surface/80 backdrop-blur-sm border border-gh-border hover:border-accent-blue/50 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-8 flex flex-col h-full">
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gh-border/60">
          <div className="flex items-center gap-2 font-mono text-xs text-gh-text-muted">
            <span className="text-accent-blue font-semibold">{project.date}</span>
            <span>•</span>
            <span className="bg-gh-canvas px-2 py-0.5 rounded border border-gh-border text-gh-text font-bold">
              {project.version || 'v1.0.0'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${statusClass}`}>
              ● {project.status || 'Completed'}
            </span>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-2">
          <h3 className="text-base md:text-lg font-bold text-gh-text group-hover:text-accent-blue transition-colors flex items-center gap-2">
            <Link href={`/project/${project.id}`} className="hover:underline flex items-center gap-2">
              <span>{project.milestoneTitle || project.title}</span>
            </Link>
          </h3>
          <p className="font-mono text-xs text-gh-text-muted mt-0.5">
            repo: <span className="text-accent-blue font-medium">{project.title}</span>
          </p>
        </div>

        {/* Short Description */}
        <p className="text-gh-text-muted text-xs md:text-sm leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags?.map((tag: string) => (
            <span key={tag} className="dev-badge text-[11px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Card Footer Actions & Stats */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gh-border/40">
          <div className="flex items-center gap-4">
            <LanguageDot language={project.tags[0]} />
            <span className="inline-flex items-center gap-1 text-gh-text-muted text-xs font-mono">
              <svg className="w-3.5 h-3.5 text-accent-yellow" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
              </svg>
              {project.stars || 1}
            </span>
          </div>

          <Link 
            href={`/project/${project.id}`} 
            className="inline-flex items-center gap-1 text-xs font-mono text-accent-blue hover:text-accent-blue/80 hover:underline font-semibold"
          >
            view case study &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

