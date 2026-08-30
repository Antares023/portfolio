import { useState, useEffect } from 'react';
import TerminalWindow from '../ui/TerminalWindow';

function useTypingAnimation(lines, speed = 40) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (line.text.length === 0) {
      setDisplayedLines(prev => {
        const updated = [...prev];
        updated[currentLine] = { ...line, text: '' };
        return updated;
      });
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 100);
      return () => clearTimeout(timeout);
    }

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          if (!updated[currentLine]) {
            updated[currentLine] = { ...line, text: '' };
          }
          updated[currentLine] = { ...updated[currentLine], text: line.text.slice(0, currentChar + 1) };
          return updated;
        });
        setCurrentChar(prev => prev + 1);
      }, line.isCommand ? speed : speed / 3);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, speed]);

  return { displayedLines, done, currentLine };
}

const terminalLines = [
  { text: '$ whoami', isCommand: true },
  { text: 'Muhammad Ilham Ramdhani (@Antares023)', isCommand: false },
  { text: '', isCommand: false },
  { text: '$ cat ~/role.json', isCommand: true },
  { text: '{ "title": "Embedded Systems and Web Development", "focus": ["Web PWA", "AI/ML Models", "IoT Systems"] }', isCommand: false },
  { text: '', isCommand: false },
  { text: '$ echo $STATUS', isCommand: true },
  { text: 'Building robust digital solutions & intelligent applications', isCommand: false },
];

export default function HeroSection() {
  const { displayedLines, done, currentLine } = useTypingAnimation(terminalLines);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-6 pb-12 md:pt-10 md:pb-20 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro Headline & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gh-surface border border-gh-border text-xs font-mono text-gh-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            Embedded Systems & Web Development
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gh-text tracking-tight leading-[1.15]">
            Crafting Intelligent <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green">
              Web & IoT Systems
            </span>
          </h1>

          <p className="text-gh-text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            Passionate software engineer specializing in full-stack web applications, machine learning models, and real-time IoT architectures. Focused on clean code, performance, and real-world impact.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo('milestones')}
              className="dev-btn-primary px-6 py-3 text-sm font-mono flex items-center gap-2 shadow-lg shadow-accent-green/10"
            >
              Explore Milestones &rarr;
            </button>
            <button
              onClick={() => scrollTo('toolbox')}
              className="dev-btn px-6 py-3 text-sm font-mono hover:border-accent-blue/60"
            >
              View My Toolbox
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="pt-6 border-t border-gh-border/60 flex flex-wrap items-center gap-6 font-mono text-xs text-gh-text-muted">
            <div>
              <span className="text-gh-text font-bold text-base block">3+ Years</span>
              Development Focus
            </div>
            <div className="h-6 w-[1px] bg-gh-border hidden sm:block" />
            <div>
              <span className="text-gh-text font-bold text-base block">10+ Projects</span>
              Web, AI & IoT
            </div>
            <div className="h-6 w-[1px] bg-gh-border hidden sm:block" />
            <div>
              <span className="text-gh-text font-bold text-base block">100% Custom</span>
              Milestone Driven
            </div>
          </div>
        </div>

        {/* Right Terminal Window */}
        <div className="lg:col-span-5 shadow-2xl">
          <TerminalWindow title="antares023@portfolio ~ % bash">
            {displayedLines.map((line, i) => (
              <div key={i} className="min-h-[1.5rem]">
                {line.isCommand ? (
                  <span className="text-accent-blue font-semibold">{line.text}</span>
                ) : (
                  <span className="text-gh-text">{line.text}</span>
                )}
                {i === currentLine && !done && (
                  <span className="cursor-blink text-accent-green ml-0.5">▋</span>
                )}
              </div>
            ))}
            {done && (
              <div className="min-h-[1.5rem]">
                <span className="text-accent-blue">$</span>
                <span className="cursor-blink text-accent-green ml-1">▋</span>
              </div>
            )}
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
