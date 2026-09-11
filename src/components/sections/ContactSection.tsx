"use client";
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';

const Giscus = lazy(() => import('@giscus/react'));

function SectionAccentLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div
      ref={ref}
      className={`w-10 h-[2px] bg-accent-blue mt-3 rounded-full ${isInView ? 'accent-line-visible' : 'accent-line'}`}
    />
  );
}

const contactLinks = [
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ilhamrmdhnii02@gmail.com',
    username: 'ilhamrmdhnii02@gmail.com',
    color: 'accent-blue',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammad-ilham-ramdhani-558b18354',
    username: '/in/muhammad-ilham-ramdhani-558b18354',
    color: 'accent-blue',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Antares023',
    username: '@Antares023',
    color: 'accent-purple',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discordapp.com/users/antaresscorpioo',
    username: '@antaresscorpioo',
    color: '[#5865F2]',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.68,65.22c-5.18,0-9.45-4.78-9.45-10.66s4.18-10.65,9.45-10.65,9.49,4.78,9.45,10.65C52.13,60.44,47.91,65.22,42.68,65.22Zm41.74,0c-5.18,0-9.45-4.78-9.45-10.66s4.18-10.65,9.45-10.65,9.49,4.78,9.45,10.65C84.42,60.44,80.21,65.22,84.42,65.22Z"/></svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/em.ham_02',
    username: '@em.ham_02',
    color: '[#E1306C]',
    colSpan: true,
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
  },
];

export default function ContactSection() {
  const { t, i18n } = useTranslation();
  const [loadGiscus, setLoadGiscus] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadGiscus(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" className="py-16 border-t border-gh-border/60 relative">
      <Reveal>
        <div className="mb-10">
          <span className="text-accent-blue font-mono text-xs uppercase tracking-wider block mb-1">
            {t('contact.tag')}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
            {t('contact.title')}
          </h2>
          <p className="text-gh-text-muted text-xs md:text-sm mt-1 max-w-xl">
            {t('contact.subtitle')}
          </p>
          <SectionAccentLine />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Guestbook (Giscus) */}
        <Reveal direction="fade-right" delay={0.2} className="lg:col-span-7 dev-card bg-gh-surface shadow-xl relative overflow-hidden group">
          {/* Ambient glow for the card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-2xl group-hover:bg-accent-blue/10 transition-colors duration-500 pointer-events-none" />
          
          <div className="relative z-10 p-4 sm:p-6">
            <h3 className="text-xl font-bold text-gh-text mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              Public Guestbook
            </h3>
            <p className="text-gh-text-muted text-sm mb-6">
              Leave a message if you'd like!
            </p>
            {loadGiscus ? (
              <Suspense fallback={<div className="h-40 flex items-center justify-center text-gh-text-muted text-sm border border-gh-border border-dashed rounded-md">Loading guestbook...</div>}>
                <Giscus
                  id="comments"
                  repo="Antares023/portfolio"
                  repoId="R_kgDON7uUaw"
                  category="General"
                  categoryId="DIC_kwDON7uUa84CnE-t"
                  mapping="pathname"
                  strict="0"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme="transparent_dark"
                  lang={i18n.language === 'id' ? 'id' : 'en'}
                  loading="lazy"
                />
              </Suspense>
            ) : (
              <div className="h-40 flex items-center justify-center text-gh-text-muted text-sm border border-gh-border border-dashed rounded-md">
                Preparing guestbook...
              </div>
            )}
          </div>
        </Reveal>

        {/* Right Info Cards */}
        <Reveal direction="fade-right" delay={0.25} className="lg:col-span-5">
          <div className="dev-card bg-gh-surface/60 border border-gh-border p-6 h-full flex flex-col justify-center">
            <h4 className="font-mono text-xs md:text-sm font-bold text-accent-blue uppercase tracking-wider mb-6 pb-2 border-b border-gh-border/50">
              {t('contact.directContact')}
            </h4>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4 font-mono text-xs">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl border border-gh-border/40 bg-gh-canvas/40 hover:bg-gh-surface hover:border-${link.color}/50 transition-all group overflow-hidden ${link.colSpan ? 'col-span-2 lg:col-span-1' : ''}`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-1.5 sm:p-2 rounded-lg bg-${link.color}/10 text-${link.color} group-hover:bg-${link.color} group-hover:text-gh-canvas transition-colors shrink-0`}>
                    {link.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-gh-text-muted text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">{link.label}</span>
                    <span className="text-gh-text font-semibold block truncate">{link.username}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

