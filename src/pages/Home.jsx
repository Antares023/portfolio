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
        <title>Muhammad Ilham Ramdhani | Web & Embedded Systems Engineer</title>
        <meta name="description" content="Muhammad Ilham Ramdhani adalah seorang Web & Embedded Systems Engineer dari Universitas Muhammadiyah Cirebon (UMC). Portofolio proyek Web, IoT, dan Machine Learning." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Ilham Ramdhani",
              "url": "https://emham.my.id/",
              "jobTitle": "Web & Embedded Systems Engineer",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Universitas Muhammadiyah Cirebon",
                "sameAs": "https://umc.ac.id/"
              },
              "knowsAbout": ["Web Development", "Embedded Systems", "IoT Engineering", "Machine Learning"]
            }
          `}
        </script>
        <meta name="keywords" content="Muhammad Ilham Ramdhani, Web Developer, Embedded Systems, IoT Systems Engineer, React, Arduino, Machine Learning, Portfolio" />
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
