"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: string;
};

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const { t } = useTranslation();

  return (
    <section className="scroll-mt-24 pt-8" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <Reveal>
            <div>
              <span className="text-accent-blue font-mono text-xs uppercase tracking-wider block mb-1">
                {t('experience.tag')}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
                {t('experience.title')}
              </h2>
              <p className="text-gh-text-muted text-xs md:text-sm mt-1 max-w-xl">
                {t('experience.subtitle')}
              </p>
              <SectionAccentLine />
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="dev-card bg-gh-surface/40 hover:bg-gh-surface/80 border border-gh-border transition-colors p-6 flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="md:w-1/4 shrink-0">
                <p className="text-sm font-mono text-gh-text-muted mt-1">{exp.duration}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded ${exp.type === 'Work' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-accent-blue/10 text-accent-blue'}`}>
                  {exp.type}
                </span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold text-gh-text">{exp.role}</h3>
                <h4 className="text-lg text-accent-purple font-medium mb-3">{exp.company}</h4>
                <p className="text-gh-text-muted text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>
            </motion.div>
          ))}
          {(!experiences || experiences.length === 0) && (
            <div className="text-center py-8 border border-dashed border-gh-border rounded-lg text-gh-text-muted font-mono text-sm">
              [No experience data found in database.]
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
