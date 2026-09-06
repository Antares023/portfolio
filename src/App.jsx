import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import React, { Suspense } from 'react';
import Home from './pages/Home';

// Lazy load ProjectDetail since it's a heavy page
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
import PageTransition from './components/ui/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gh-text">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App({ helmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gh-canvas w-full transition-colors duration-300">
          <Navbar />
          <main className="flex-grow overflow-x-hidden">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
