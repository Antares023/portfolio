import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { toolboxItems, toolboxCategories } from '../../data/toolbox';
import Reveal from '../ui/Reveal';

function SectionAccentLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div
      ref={ref}
      className={`w-10 h-[2px] bg-accent-green mt-3 rounded-full ${isInView ? 'accent-line-visible' : 'accent-line'}`}
    />
  );
}
import { 
  siCplusplus, siArduino, siEspressif, 
  siHtml5, siJavascript, siPhp, siLaravel, siReact, siVite,
  siPython, siTensorflow, siMysql, siFirebase,
  siGithub, siVercel, siPostman, siMqtt, siCss
} from 'simple-icons';


// Helper function for rendering SVG icons for tech stack items
function TechIcon({ icon }) {
  const svgClass = "w-5 h-5 sm:w-8 sm:h-8";
  
  // Custom SVG paths for tools not in simple-icons
  const customIcons = {
    yolo: (
      <svg className={svgClass} viewBox="0 0 24 24" fill="#00FFFF">
        {/* YOLO object detection icon representation (bounding box with crosshair) */}
        <path d="M4 4v4H2V2h6v2H4zm16 0h-4V2h6v6h-2V4zM4 20h4v2H2v-6h2v4zm16 0v-4h2v6h-6v-2h4z"/>
        <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z"/>
      </svg>
    ),
    laragon: (
      <svg className={svgClass} viewBox="0 0 24 24" fill="#00A7E3">
        {/* Laragon approximated logo (blue polygon/shield) */}
        <path d="M12 2L3.5 6.5v11L12 22l8.5-4.5v-11L12 2zm0 2.3l6.5 3.5-3.5 1.9-3-1.6-3 1.6-3.5-1.9L12 4.3zm0 14.5l-6.5-3.5v-6.3l3 1.6 3.5 1.9 3.5-1.9 3-1.6v6.3L12 18.8z"/>
      </svg>
    )
  };

  if (icon === 'yolo') return customIcons.yolo;
  if (icon === 'laragon') return customIcons.laragon;

  // Mapping from our string identifier to the imported simple-icon object
  const iconMap = {
    cpp: { data: siCplusplus, color: "#00599C" },
    arduino: { data: siArduino, color: "#00979D" },
    chip: { data: siEspressif, color: "#E7352F" }, // Espressif logo for ESPs
    html: { data: siHtml5, color: "#E34F26" },
    css: { data: siCss, color: "#1572B6" },
    javascript: { data: siJavascript, color: "#F7DF1E" },
    php: { data: siPhp, color: "#777BB4" },
    laravel: { data: siLaravel, color: "#FF2D20" },
    react: { data: siReact, color: "#61DAFB" },
    vite: { data: siVite, color: "#646CFF" },
    python: { data: siPython, color: "#3776AB" },
    tensorflow: { data: siTensorflow, color: "#FF6F00" },
    mysql: { data: siMysql, color: "#4479A1" },
    firebase: { data: siFirebase, color: "#FFCA28" },
    github: { data: siGithub, color: "#ffffff" },
    vercel: { data: siVercel, color: "#ffffff" },
    postman: { data: siPostman, color: "#FF6C37" },
    mqtt: { data: siMqtt, color: "#660066" }
  };

  const simpleIcon = iconMap[icon];

  if (simpleIcon && simpleIcon.data) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={svgClass}
        fill={simpleIcon.color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{simpleIcon.data.title}</title>
        <path d={simpleIcon.data.path} />
      </svg>
    );
  }

  // Fallback
  return (
    <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function ToolboxSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredItems = activeCategory === 'All'
    ? toolboxItems
    : toolboxItems.filter(item => item.category === activeCategory);

  return (
    <section id="toolbox" className="py-16 border-t border-gh-border/60 relative z-10">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <Reveal>
          <div>
            <span className="text-accent-green font-mono text-xs uppercase tracking-wider block mb-1">
              // Tech Stack & Frameworks
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
              Tech Stack
            </h2>
            <p className="text-gh-text-muted text-xs md:text-sm mt-1 max-w-xl">
              A curated list of programming languages, frameworks, libraries, and tools I use to build scalable products.
            </p>
            <SectionAccentLine />
          </div>
        </Reveal>

        {/* Category Dropdown Filter */}
        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full md:w-64 flex items-center justify-between gap-3 bg-gh-surface/60 backdrop-blur-md border px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gh-text transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${
              isDropdownOpen 
                ? 'border-accent-blue/80 bg-gh-surface shadow-[0_4px_20px_rgba(59,130,246,0.15)]' 
                : 'border-gh-border/60 hover:border-accent-blue/50 hover:bg-gh-surface'
            }`}
          >
            <span className="truncate">{activeCategory}</span>
            <svg 
              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent-blue' : 'text-gh-text-muted'}`} 
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
                  {toolboxCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center gap-2 ${
                        activeCategory === cat
                          ? 'bg-accent-blue/15 text-accent-blue border-l-2 border-accent-blue'
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
      </div>

      {/* Grid of Tech Stack Icons */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="dev-card bg-gh-surface/80 border border-gh-border hover:border-accent-blue/50 p-2 sm:p-4 flex flex-col items-center justify-center text-center group hover:shadow-lg transition-all"
            >
              <div className="mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-200">
                <TechIcon icon={item.icon} />
              </div>
              <h4 className="font-mono text-[10px] sm:text-xs font-bold text-gh-text group-hover:text-accent-blue transition-colors">
                {item.name}
              </h4>
              <span className="text-[8px] sm:text-[10px] font-mono text-gh-text-muted mt-1 bg-gh-canvas px-1.5 sm:px-2 py-0.5 rounded border border-gh-border">
                {item.level}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
