"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const navItems = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'toolbox', labelKey: 'nav.techStack' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'milestones', labelKey: 'nav.milestones' },
  { id: 'certificates', labelKey: 'nav.certificates' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('en');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'id' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-lang', newLang);
    }
  };

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: scrollProgress, width: '100%' }}
      />

      <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gh-surface/90 backdrop-blur-md border-b border-gh-border/80 shadow-lg py-2.5' 
          : 'bg-gh-canvas/80 backdrop-blur-sm border-b border-gh-border/40 py-3.5'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <Link 
            href="/" 
            onClick={() => isHomePage && scrollToSection('hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-green p-[1.5px] group-hover:scale-105 transition-transform">
              <img
                src="https://avatars.githubusercontent.com/u/147645907"
                alt="Avatar"
                className="w-full h-full rounded-[6px] object-cover bg-gh-canvas"
              />
            </div>
            <span className="font-mono text-sm font-bold text-gh-text tracking-tight group-hover:text-accent-blue transition-colors">
              emham<span className="text-accent-blue">.my.id</span>
              <span className="cursor-blink text-accent-green ml-0.5">_</span>
            </span>
          </Link>

          {/* Desktop Navigation Links — with animated pill */}
          <div className="hidden md:flex items-center gap-1 bg-gh-surface/60 border border-gh-border/60 p-1 rounded-full backdrop-blur-sm relative">
            {navItems.map(item => (
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1 rounded-full text-xs font-mono transition-colors z-10 ${
                    activeSection === item.id
                      ? 'text-gh-canvas font-semibold'
                      : 'text-gh-text-muted hover:text-gh-text'
                  }`}
                >
                  {/* Animated pill background */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-accent-blue rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.labelKey)}</span>
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className="px-3.5 py-1 rounded-full text-xs font-mono text-gh-text-muted hover:text-gh-text transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              )
            ))}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Toggles Group */}
            <div className="flex items-center gap-2 sm:gap-4 ml-1 sm:ml-2">
              {/* Theme Slider */}
              <button
                type="button"
                onClick={toggleTheme}
                className="relative flex items-center w-[60px] h-[30px] bg-gh-surface/80 border border-gh-border rounded-full p-1 cursor-pointer transition-colors focus:outline-none hover:border-gh-border-hover"
                aria-label="Toggle theme"
              >
                <motion.div
                  className="absolute w-[22px] h-[22px] bg-gh-text rounded-full flex items-center justify-center z-10 shadow-sm"
                  animate={{ x: theme === 'dark' ? 30 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === 'dark' ? (
                    <svg className="w-3.5 h-3.5 text-gh-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-gh-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </motion.div>
                <div className="w-full flex justify-between px-1 text-gh-text-muted">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
              </button>

              {/* Language Slider */}
              {mounted && (
                <button
                  type="button"
                  onClick={toggleLang}
                  className="relative flex items-center w-[60px] h-[30px] bg-gh-surface/80 border border-gh-border rounded-full p-1 cursor-pointer transition-colors focus:outline-none hover:border-gh-border-hover"
                  aria-label="Toggle language"
                >
                  <motion.div
                    className="absolute w-[22px] h-[22px] bg-accent-blue rounded-full flex items-center justify-center z-10 shadow-sm"
                    animate={{ x: lang === 'id' ? 30 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {lang === 'id' ? 'ID' : 'EN'}
                    </span>
                  </motion.div>
                  <div className="w-full flex justify-between px-1.5 text-[10px] font-bold text-gh-text-muted font-mono">
                    <span>EN</span>
                    <span>ID</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              type="button"
              className="md:hidden p-2 ml-1 -mr-2 text-gh-text-muted hover:text-gh-text focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"/>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown — robust CSS-based transition */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-gh-surface border-b border-gh-border/80 shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top ${
            mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="p-4 flex flex-col gap-3">
            {navItems.map(item => (
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2 rounded-md text-sm font-mono transition-colors ${
                    activeSection === item.id ? 'bg-accent-blue/10 text-accent-blue font-bold' : 'text-gh-text-muted hover:bg-gh-canvas hover:text-gh-text'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left px-4 py-2 rounded-md text-sm font-mono text-gh-text-muted hover:bg-gh-canvas hover:text-gh-text transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              )
            ))}
            <div className="h-px bg-gh-border/50 my-2" />
          </div>
        </div>
      </nav>
    </>
  );
}
