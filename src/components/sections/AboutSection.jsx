export default function AboutSection() {
  return (
    <section id="about" className="py-16 border-t border-gh-border/60 relative">
      <div className="mb-10">
        <span className="text-accent-blue font-mono text-xs uppercase tracking-wider block mb-1">
          // Who I Am
        </span>
        <h2 className="text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
          About Me
        </h2>
        <p className="text-gh-text-muted text-sm mt-1 max-w-xl">
          A dedicated Software Engineer driven by curiosity, technical rigor, and building high-performance systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Profile Bio Card */}
        <div className="lg:col-span-5 dev-card bg-gh-surface/80 border border-gh-border p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="https://avatars.githubusercontent.com/u/147645907"
                alt="Muhammad Ilham Ramdhani"
                className="w-16 h-16 rounded-xl border border-gh-border object-cover"
              />
              <div>
                <h3 className="font-mono text-base font-bold text-gh-text">Muhammad Ilham Ramdhani</h3>
                <p className="text-xs text-accent-blue font-mono">@Antares023</p>
                <p className="text-xs text-gh-text-muted mt-0.5">Embedded Systems & Web Development</p>
              </div>
            </div>

            <p className="text-gh-text-muted text-sm leading-relaxed">
              Hello! I am a Software Engineer based in Indonesia with a strong background in developing progressive web applications, machine learning classification engines, and IoT sensor platforms.
            </p>

            <p className="text-gh-text-muted text-sm leading-relaxed">
              I believe software engineering is about solving real-world challenges through elegant architecture, robust algorithms, and responsive user interfaces.
            </p>
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

        {/* Right Engineering Pillars (Auto-scrolling Marquee on Mobile) */}
        <div className="lg:col-span-7 overflow-hidden relative">
          <div className="flex sm:grid sm:grid-cols-2 gap-4 w-max sm:w-auto animate-marquee-mobile">
            {/* Original 4 Cards */}
            <div className="shrink-0 w-[80vw] sm:w-auto dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-blue/40 transition-colors p-5">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xl mb-3 font-mono">
                💻
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">Web Development</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Building responsive Single Page Applications and Progressive Web Apps (PWA) using React, Tailwind CSS, Laravel, and modern JavaScript toolchains.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:w-auto dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-purple/40 transition-colors p-5">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/10 text-accent-purple flex items-center justify-center text-xl mb-3 font-mono">
                🧠
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">AI & Machine Learning</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Designing predictive neural networks, computer vision algorithms, and fuzzy logic expert systems using Python, TensorFlow, and OpenCV.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:w-auto dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-green/40 transition-colors p-5">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 text-accent-green flex items-center justify-center text-xl mb-3 font-mono">
                ⚡
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">IoT & Embedded Systems</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Interfacing ESP32/ESP8266 microcontrollers with real-time sensors, telemetry protocols (MQTT, HTTP), and cloud dashboards.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:w-auto dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-orange/40 transition-colors p-5">
              <div className="w-10 h-10 rounded-lg bg-accent-orange/10 text-accent-orange flex items-center justify-center text-xl mb-3 font-mono">
                🚀
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">Clean Architecture</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Writing maintainable, modular, and well-documented code adhering to solid engineering principles, Git versioning, and CI/CD workflows.
              </p>
            </div>

            {/* Duplicated 4 Cards (Hidden on Desktop) to create a seamless infinite loop */}
            <div className="shrink-0 w-[80vw] sm:hidden dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-blue/40 transition-colors p-5" aria-hidden="true">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xl mb-3 font-mono">
                💻
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">Web Engineering</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Building responsive Single Page Applications and Progressive Web Apps (PWA) using React, Tailwind CSS, Laravel, and modern JavaScript toolchains.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:hidden dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-purple/40 transition-colors p-5" aria-hidden="true">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/10 text-accent-purple flex items-center justify-center text-xl mb-3 font-mono">
                🧠
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">AI & Machine Learning</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Designing predictive neural networks, computer vision algorithms, and fuzzy logic expert systems using Python, TensorFlow, and OpenCV.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:hidden dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-green/40 transition-colors p-5" aria-hidden="true">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 text-accent-green flex items-center justify-center text-xl mb-3 font-mono">
                ⚡
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">IoT & Embedded Systems</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Interfacing ESP32/ESP8266 microcontrollers with real-time sensors, telemetry protocols (MQTT, HTTP), and cloud dashboards.
              </p>
            </div>

            <div className="shrink-0 w-[80vw] sm:hidden dev-card bg-gh-surface/60 border border-gh-border hover:border-accent-orange/40 transition-colors p-5" aria-hidden="true">
              <div className="w-10 h-10 rounded-lg bg-accent-orange/10 text-accent-orange flex items-center justify-center text-xl mb-3 font-mono">
                🚀
              </div>
              <h4 className="font-mono font-bold text-gh-text text-sm mb-2">Clean Architecture</h4>
              <p className="text-gh-text-muted text-xs leading-relaxed">
                Writing maintainable, modular, and well-documented code adhering to solid engineering principles, Git versioning, and CI/CD workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
