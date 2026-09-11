"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import '../i18n';
import { useTranslation } from 'react-i18next';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState(() => {
    // Check localStorage first, if available (browser environment)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved;
    }
    // Default to dark
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]); // Do not include i18n here, it causes infinite loops/reverts

  useEffect(() => {
    // Initial language setup on mount only
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang) {
      if (i18n.language !== savedLang) i18n.changeLanguage(savedLang);
    } else {
      const userLang = navigator.language.startsWith('id') ? 'id' : 'en';
      if (i18n.language !== userLang) {
        i18n.changeLanguage(userLang);
        localStorage.setItem('portfolio-lang', userLang);
      }
    }
  }, []); // Run only on mount

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
