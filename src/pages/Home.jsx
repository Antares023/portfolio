import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ToolboxSection from '../components/sections/ToolboxSection';
import MilestonesSection from '../components/sections/MilestonesSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Muhammad Ilham Ramdhani | Software Engineer</title>
        <meta name="description" content="Portfolio of Muhammad Ilham Ramdhani featuring About Me, Tech Toolbox, Milestone Projects, and Contact." />
        <link rel="canonical" href="https://emham.my.id/" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About Me Section */}
        <AboutSection />

        {/* Section 3: My Toolbox (SVG Tech Stack) */}
        <ToolboxSection />

        {/* Section 4: Projects & Milestones Timeline */}
        <MilestonesSection />

        {/* Section 5: Contact Me Section */}
        <ContactSection />
      </div>
    </>
  );
}
