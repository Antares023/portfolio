import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Reveal from '../ui/Reveal';

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

export default function AboutSection() {
  return (
    <section id="about" className="py-16 border-t border-gh-border/60 relative">
      <Reveal>
        <div className="mb-10">
          <span className="text-accent-blue font-mono text-xs uppercase tracking-wider block mb-1">
            // Who I Am
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
            About Me
          </h2>
          <p className="text-gh-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            A dedicated Web & Embedded Systems Engineer driven by curiosity, technical rigor, and building high-performance solutions.
          </p>
          <SectionAccentLine />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Profile Bio Card */}
        <Reveal direction="fade-left" delay={0.15} className="lg:col-span-5">
          <div className="dev-card bg-gh-surface/80 border border-gh-border p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://avatars.githubusercontent.com/u/147645907"
                  alt="Muhammad Ilham Ramdhani"
                  className="w-16 h-16 rounded-xl border border-gh-border object-cover"
                />
                <div>
                  <h3 className="font-mono text-sm md:text-base font-bold text-gh-text">Muhammad Ilham Ramdhani</h3>
                  <p className="text-xs text-accent-blue font-mono">@Antares023</p>
                  <p className="text-[10px] sm:text-xs text-gh-text-muted mt-0.5">Embedded Systems & Web Development</p>
                </div>
              </div>

              <p className="text-gh-text-muted text-xs sm:text-sm leading-relaxed">
                Hello! I am a Web & Embedded Systems Engineer based in Indonesia with a strong background in developing progressive web applications, machine learning models, and IoT sensor platforms.
              </p>

              <p className="text-gh-text-muted text-xs sm:text-sm leading-relaxed">
                I believe engineering is about solving real-world challenges through elegant architecture, robust algorithms, and seamless hardware-software integration.
              </p>

              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-blue font-mono text-xs sm:text-sm font-semibold hover:underline transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Full Resume (.pdf)
                </a>
              </div>
            </div>

            {/* Social Badges */}
            <div className="pt-6 mt-6 border-t border-gh-border/60 flex items-center justify-between font-mono text-xs">
              <span className="text-gh-text-subtle">Location: Indonesia</span>
              <span className="text-accent-green flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-green" />
                Active Code
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right Engineering Pillars (Auto-scrolling Marquee on Mobile) */}
        <div className="lg:col-span-7 overflow-hidden relative">
          <div className="flex sm:grid sm:grid-cols-2 gap-4 w-max sm:w-auto animate-marquee-mobile">
            {/* Original 4 Cards */}
            {[
              { emoji: '💻', title: 'Web Development', desc: 'Building responsive Single Page Applications and Progressive Web Apps (PWA) using React, Tailwind CSS, Laravel, and modern JavaScript toolchains.', color: 'accent-blue' },
              { emoji: '🧠', title: 'AI & Machine Learning', desc: 'Designing predictive neural networks, computer vision algorithms, and fuzzy logic expert systems using Python, TensorFlow, and OpenCV.', color: 'accent-purple' },
              { emoji: '⚡', title: 'IoT & Embedded Systems', desc: 'Interfacing ESP32/ESP8266 microcontrollers with real-time sensors, telemetry protocols (MQTT, HTTP), and cloud dashboards.', color: 'accent-green' },
              { emoji: '🚀', title: 'Clean Architecture', desc: 'Writing maintainable, modular, and well-documented code adhering to solid engineering principles, Git versioning, and CI/CD workflows.', color: 'accent-orange' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.1} className="shrink-0 w-[80vw] sm:w-auto">
                <div className={`dev-card bg-gh-surface/60 border border-gh-border hover:border-${card.color}/40 transition-colors p-5 h-full`}>
                  <div className={`w-10 h-10 rounded-lg bg-${card.color}/10 text-${card.color} flex items-center justify-center text-xl mb-3 font-mono`}>
                    {card.emoji}
                  </div>
                  <h4 className="font-mono font-bold text-gh-text text-sm mb-2">{card.title}</h4>
                  <p className="text-gh-text-muted text-xs leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}

            {/* Duplicated 4 Cards (Hidden on Desktop) to create a seamless infinite loop */}
            {[
              { emoji: '💻', title: 'Web Engineering', desc: 'Building responsive Single Page Applications and Progressive Web Apps (PWA) using React, Tailwind CSS, Laravel, and modern JavaScript toolchains.', color: 'accent-blue' },
              { emoji: '🧠', title: 'AI & Machine Learning', desc: 'Designing predictive neural networks, computer vision algorithms, and fuzzy logic expert systems using Python, TensorFlow, and OpenCV.', color: 'accent-purple' },
              { emoji: '⚡', title: 'IoT & Embedded Systems', desc: 'Interfacing ESP32/ESP8266 microcontrollers with real-time sensors, telemetry protocols (MQTT, HTTP), and cloud dashboards.', color: 'accent-green' },
              { emoji: '🚀', title: 'Clean Architecture', desc: 'Writing maintainable, modular, and well-documented code adhering to solid engineering principles, Git versioning, and CI/CD workflows.', color: 'accent-orange' },
            ].map((card) => (
              <div key={`dup-${card.title}`} className={`shrink-0 w-[80vw] sm:hidden dev-card bg-gh-surface/60 border border-gh-border hover:border-${card.color}/40 transition-colors p-5`} aria-hidden="true">
                <div className={`w-10 h-10 rounded-lg bg-${card.color}/10 text-${card.color} flex items-center justify-center text-xl mb-3 font-mono`}>
                  {card.emoji}
                </div>
                <h4 className="font-mono font-bold text-gh-text text-sm mb-2">{card.title}</h4>
                <p className="text-gh-text-muted text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
