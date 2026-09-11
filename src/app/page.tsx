import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ToolboxSection from '../components/sections/ToolboxSection';
import MilestonesSection from '../components/sections/MilestonesSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import CertificateSection from '../components/sections/CertificateSection';
import ContactSection from '../components/sections/ContactSection';
import { supabaseAdmin } from '../lib/supabase';

export default async function Home() {
  const { data: projectsData } = await supabaseAdmin.from('Project').select('*').order('order', { ascending: true });
  const { data: categoriesData } = await supabaseAdmin.from('ToolboxCategory').select('*').order('order', { ascending: true });
  const { data: itemsData } = await supabaseAdmin.from('ToolboxItem').select('*, ToolboxCategory(name)');
  const { data: experiencesData } = await supabaseAdmin.from('Experience').select('*').order('order', { ascending: true });
  const { data: certificatesData } = await supabaseAdmin.from('Certificate').select('*').order('order', { ascending: true });

  const projects = projectsData || [];
  const experiences = experiencesData || [];
  const certificates = certificatesData || [];
  const toolboxCategories = ['All', ...(categoriesData?.map(c => c.name) || [])];
  const toolboxItems = itemsData?.map(item => ({
    name: item.name,
    icon: item.iconUrl || item.name.toLowerCase(),
    category: item.ToolboxCategory?.name,
    level: 'Advanced'
  })) || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Ilham Ramdhani",
    "url": "https://www.emham.my.id/",
    "jobTitle": "Web & Embedded Systems Engineer",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Universitas Muhammadiyah Cirebon",
      "sameAs": "https://umc.ac.id/"
    },
    "knowsAbout": ["Web Development", "Embedded Systems", "IoT Engineering", "Machine Learning"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 space-y-12 pb-16">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About Me Section */}
        <AboutSection />

        {/* Section 3: My Toolbox (SVG Tech Stack) */}
        <ToolboxSection toolboxItems={toolboxItems} toolboxCategories={toolboxCategories} />

        {/* Section 4: Experience */}
        <ExperienceSection experiences={experiences} />

        {/* Section 5: Projects & Milestones Timeline */}
        <MilestonesSection projects={projects} />

        {/* Section 6: Certificates */}
        <CertificateSection certificates={certificates} />

        {/* Section 7: Contact Me Section */}
        <ContactSection />
      </div>
    </>
  );
}
