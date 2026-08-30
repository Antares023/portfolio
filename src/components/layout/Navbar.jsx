import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'toolbox', label: 'Tech Stack' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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

  const scrollToSection = (id) => {
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
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gh-surface/90 backdrop-blur-md border-b border-gh-border/80 shadow-lg py-2.5' 
        : 'bg-gh-canvas/80 backdrop-blur-sm border-b border-gh-border/40 py-3.5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link 
          to="/" 
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
            emham<span className="text-accent-blue">.dev</span>
            <span className="cursor-blink text-accent-green ml-0.5">_</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-gh-surface/60 border border-gh-border/60 p-1 rounded-full backdrop-blur-sm">
          {navItems.map(item => (
            isHomePage ? (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all ${
                  activeSection === item.id
                    ? 'bg-accent-blue text-gh-canvas font-semibold shadow-sm'
                    : 'text-gh-text-muted hover:text-gh-text hover:bg-gh-canvas/50'
                }`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                className="px-3.5 py-1 rounded-full text-xs font-mono text-gh-text-muted hover:text-gh-text transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Antares023"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 dev-btn text-xs font-mono hover:border-accent-blue/60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          

          {isHomePage ? (
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden lg:inline-flex dev-btn-primary text-xs font-mono items-center gap-1.5"
            >
              Contact Me
            </button>
          ) : (
            <Link
              to="/#contact"
              className="hidden lg:inline-flex dev-btn-primary text-xs font-mono items-center gap-1.5"
            >
              Contact Me
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gh-text-muted hover:text-gh-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gh-surface border-b border-gh-border/80 p-4 flex flex-col gap-3 shadow-xl">
          {navItems.map(item => (
            isHomePage ? (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-2 rounded-md text-sm font-mono ${
                  activeSection === item.id ? 'bg-accent-blue/10 text-accent-blue font-bold' : 'text-gh-text-muted'
                }`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left px-4 py-2 rounded-md text-sm font-mono text-gh-text-muted"
              >
                {item.label}
              </Link>
            )
          ))}
          <div className="h-px bg-gh-border/50 my-2" />
          <a
            href="https://github.com/Antares023"
            target="_blank"
            rel="noreferrer"
            className="dev-btn w-full justify-center text-xs font-mono mb-2"
          >
            GitHub Profile
          </a>
          {isHomePage ? (
            <button
              onClick={() => scrollToSection('contact')}
              className="dev-btn-primary w-full justify-center text-xs font-mono"
            >
              Contact Me
            </button>
          ) : (
            <Link
              to="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="dev-btn-primary flex justify-center text-xs font-mono"
            >
              Contact Me
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
