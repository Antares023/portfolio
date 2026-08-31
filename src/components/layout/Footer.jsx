import Reveal from '../ui/Reveal';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gh-border mt-16">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gh-text-muted text-xs">
            © 2026 Antares023. Built with{' '}
            <span className="text-gh-text-subtle">React</span>{' + '}
            <span className="text-gh-text-subtle">Vite</span>{' + '}
            <span className="text-gh-text-subtle">Tailwind</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Antares023" target="_blank" rel="noreferrer" className="text-gh-text-muted hover:text-gh-text text-xs transition-colors">
              GitHub
            </a>
            <span className="text-gh-border">·</span>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ilhamrmdhnii02@gmail.com" target="_blank" rel="noreferrer" className="text-gh-text-muted hover:text-gh-text text-xs transition-colors">
              Email
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
