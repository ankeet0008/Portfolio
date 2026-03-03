import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './utils/useLenis';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import SuperBadassMarquee from './components/SuperBadassMarquee';
import Freebies from './components/Freebies';
import Preloader from './components/Preloader';
import Noise from './components/Noise';
import ProjectDetail from './components/ProjectDetail';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ThankYou from './components/ThankYou';
import { Project } from './types';

type ViewState = 'home' | 'about' | 'contact';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Lenis smooth scroll globally
  const lenisRef = useLenis();

  // Lock body scroll and pause Lenis during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      lenisRef.current?.stop(); // Pause smooth scroll during preloader
    } else {
      document.body.style.overflow = 'auto';
      lenisRef.current?.start(); // Resume smooth scroll after preloader
    }
  }, [isLoading, lenisRef]);

  const handleNavigate = (view: 'home' | 'about' | 'contact' | 'work') => {
    if (view === 'work') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const workSection = document.getElementById('work');
          if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const workSection = document.getElementById('work');
        if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
      }
      setSelectedProject(null);
    } else {
      setCurrentView(view);
      setSelectedProject(null);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-white selection:text-black">
      {/* Preloader sits on top of everything */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Noise />

      <Header onNavigate={handleNavigate} isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="project-detail"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            onNext={(p) => setSelectedProject(p)}
          />
        ) : currentView === 'about' ? (
          <AboutPage
            key="about-page"
            onBack={() => setCurrentView('home')}
            onNavigateContact={() => setCurrentView('contact')}
          />
        ) : currentView === 'contact' ? (
          <ContactPage
            key="contact-page"
            onBack={() => setCurrentView('home')}
          />
        ) : (
          <main key="home-content">
            <Hero />
            <div className="relative z-10 bg-neutral-950 mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <About />
              <SuperBadassMarquee />
              <SelectedWork onProjectSelect={setSelectedProject} />
              <Freebies />
              <ThankYou />
              <Contact />
            </div>
          </main>
        )}
      </AnimatePresence>

      <AIAssistant />
    </div>
  );
};

export default App;