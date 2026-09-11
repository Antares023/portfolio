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
      className={`w-10 h-[2px] bg-accent-green mt-3 rounded-full ${isInView ? 'accent-line-visible' : 'accent-line'}`}
    />
  );
}
import { ExternalLink, Award } from 'lucide-react';

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string | null;
  imageUrl: string | null;
};

export default function CertificateSection({ certificates }: { certificates: Certificate[] }) {
  const { t } = useTranslation();

  return (
    <section className="scroll-mt-24 pt-8" id="certificates">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <Reveal>
            <div>
              <span className="text-accent-green font-mono text-xs uppercase tracking-wider block mb-1">
                {t('certificate.tag')}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gh-text tracking-tight flex items-center gap-3">
                {t('certificate.title')}
              </h2>
              <p className="text-gh-text-muted text-xs md:text-sm mt-1 max-w-xl">
                {t('certificate.subtitle')}
              </p>
              <SectionAccentLine />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert, index) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="dev-card bg-gh-surface/40 hover:bg-gh-surface/80 border border-gh-border transition-colors p-5 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-accent-blue/10 rounded-md">
                  <Award className="w-6 h-6 text-accent-blue" />
                </div>
                <p className="text-xs font-mono text-gh-text-muted">{cert.date}</p>
              </div>
              
              <h3 className="text-lg font-bold text-gh-text mb-1 flex-1">{cert.title}</h3>
              <p className="text-sm text-gh-text-muted mb-4">{cert.issuer}</p>
              
              {cert.url && (
                <div className="mt-auto pt-4 border-t border-gh-border/50">
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-accent-blue hover:underline"
                  >
                    View Credential <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {(!certificates || certificates.length === 0) && (
          <div className="text-center py-8 mt-4 border border-dashed border-gh-border rounded-lg text-gh-text-muted font-mono text-sm">
            [No certificates found in database.]
          </div>
        )}
      </motion.div>
    </section>
  );
}
