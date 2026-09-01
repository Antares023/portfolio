import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TerminalWindow from '../ui/TerminalWindow';
import Reveal from '../ui/Reveal';

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

// Counter animation hook
function useCountUp(target, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startOnView && !hasStarted) return;
    if (!startOnView && hasStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration, startOnView]);

  return { count, trigger: () => setHasStarted(true) };
}

function AnimatedCounter({ target, suffix = '' }) {
  const { count, trigger } = useCountUp(target, 1800, true);
  const ref = useState(null);

  useEffect(() => {
    // Trigger count-up after a small delay for stagger
    const timer = setTimeout(() => trigger(), 600);
    return () => clearTimeout(timer);
  }, [trigger]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  const { displayedLines, done, currentLine } = useTypingAnimation(terminalLines);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const { t } = useTranslation();

  return (
    <section id="hero" className="pt-6 pb-12 md:pt-10 md:pb-20 relative">
      {/* Background Ambient Glows — now with breathing animation */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none -z-10 ambient-glow" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none -z-10 ambient-glow" style={{ animationDelay: '6s' }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro Headline & CTA — staggered reveals */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gh-surface border border-gh-border text-xs font-mono text-gh-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              {t('hero.badge')}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gh-text tracking-tight leading-[1.15]">
              {t('hero.titleLine1')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green gradient-shimmer">
                {t('hero.titleLine2')}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-gh-text-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={0.55}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                onClick={() => scrollTo('milestones')}
                className="dev-btn-primary px-4 py-2 text-xs md:px-6 md:py-3 md:text-sm font-mono flex items-center gap-2 shadow-lg shadow-accent-green/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Milestones &rarr;
              </motion.button>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-btn px-4 py-2 text-xs md:px-6 md:py-3 md:text-sm font-mono flex items-center gap-2 border-accent-blue/30 text-accent-blue hover:border-accent-blue hover:bg-accent-blue/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('hero.ctaResume')}
              </motion.a>
              <motion.button
                onClick={() => scrollTo('toolbox')}
                className="dev-btn px-4 py-2 text-xs md:px-6 md:py-3 md:text-sm font-mono hover:border-gh-border-hover"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Toolbox
              </motion.button>
            </div>
          </Reveal>

          {/* Quick Metrics Badge — with counter animation */}
          <Reveal delay={0.7}>
            <div className="pt-6 border-t border-gh-border/60 flex flex-wrap items-center gap-6 font-mono text-xs text-gh-text-muted">
              <div>
                <span className="text-gh-text font-bold text-sm md:text-base block">
                  <AnimatedCounter target={3} suffix="+" /> {t('hero.yearsLabel')}
                </span>
                {t('hero.yearsSub')}
              </div>
              <div className="h-6 w-[1px] bg-gh-border hidden sm:block" />
              <div>
                <span className="text-gh-text font-bold text-sm md:text-base block">
                  <AnimatedCounter target={10} suffix="+" /> {t('hero.projectsLabel')}
                </span>
                {t('hero.projectsSub')}
              </div>
              <div className="h-6 w-[1px] bg-gh-border hidden sm:block" />
              <div>
                <span className="text-gh-text font-bold text-sm md:text-base block">
                  <AnimatedCounter target={100} suffix="%" /> {t('hero.customLabel')}
                </span>
                {t('hero.customSub')}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Terminal Window — slides in from right */}
        <Reveal direction="fade-right" delay={0.5} className="lg:col-span-5 shadow-2xl">
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
        </Reveal>
      </div>
    </section>
  );
}
