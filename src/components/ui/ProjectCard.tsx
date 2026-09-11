"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageDot from './LanguageDot';

export default function ProjectCard({ project, index = 0 }: { project: any; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/project/${project.id}`}
        className="dev-card block group h-full"
      >
        {/* Header row */}
        <div className="flex items-start gap-3 mb-2">
          <svg className="w-4 h-4 text-gh-text-muted mt-0.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
          </svg>
          <h3 className="text-accent-blue font-semibold text-sm group-hover:underline leading-tight">
            {project.title}
          </h3>
          <span className="ml-auto text-[10px] text-gh-text-muted border border-gh-border rounded-full px-2 py-0.5 shrink-0">
            Public
          </span>
        </div>

        {/* Description */}
        <p className="text-gh-text-muted text-xs leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags?.map((tag: string) => (
            <span key={tag} className="dev-badge text-[10px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: language + stars */}
        <div className="flex items-center gap-4 mt-auto pt-2">
          <LanguageDot language={project.tags[0]} />
          <span className="inline-flex items-center gap-1 text-gh-text-muted text-xs">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
            </svg>
            {project.stars || 1}
          </span>
          {project.repoUrl && (
            <span className="inline-flex items-center gap-1 text-gh-text-muted text-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
              </svg>
              0
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

