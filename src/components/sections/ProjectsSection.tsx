'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project } from '@/core/domain/types';
import { Badge } from '@/components/ui/badge';
import Reveal from '@/components/effects/Reveal';
import ImageZoomModal from '@/components/effects/ImageZoomModal';
import { getMessages, type Locale } from '@/i18n/messages';

export default function ProjectsSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const text = getMessages(locale).projects;
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  } | null>(null);

  return (
    <>
      <section id="projetos" aria-labelledby="projects-title" className="section-shell py-14 md:py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.05}>
            <p className="eyebrow mb-5">
              <span className="text-primary">01 /</span> {text.eyebrow}
            </p>
            <h2 id="projects-title" className="section-heading">
              {text.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-[250px] text-sm leading-relaxed text-muted-foreground">
              {text.description}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={0.1 + (index % 2) * 0.15}
              className={index === 0 ? 'md:col-span-2' : ''}
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="surface-panel group rounded-[28px] p-2.5 transition-colors hover:border-primary/40 md:p-3"
              >
                <div
                  className={`relative overflow-hidden rounded-[18px] border border-border/60 bg-card ${
                    index === 0 ? 'aspect-[1.35] md:aspect-[2.25]' : 'aspect-[1.5]'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={text.imageAlt(project.title)}
                    fill
                    sizes={
                      index === 0
                        ? '(max-width: 767px) 90vw, 90vw'
                        : '(max-width: 767px) 90vw, 45vw'
                    }
                    className="project-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: project.objectPosition || 'center' }}
                  />

                  {/* Top-Right: External Project Link */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={text.visit(project.title)}
                    className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ArrowUpRight size={18} className="translate-y-[-0.5px]" />
                  </motion.a>

                  {/* Top-Left: Zoom / Enlarge Button */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setSelectedImage({
                        src: project.image,
                        alt: text.imageAlt(project.title),
                        title: project.title,
                        subtitle: `0${index + 1} / ${project.category}`,
                      })
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={text.zoom(project.title)}
                    className="absolute left-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white opacity-80 backdrop-blur-md transition-all hover:opacity-100 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Maximize2 size={16} className="translate-y-[-0.5px]" />
                  </motion.button>

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
                    0{index + 1} / {project.category}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <h3 className="text-2xl font-medium tracking-[-.04em] transition-colors group-hover:text-primary md:text-3xl">
                      {project.title}
                    </h3>
                  </a>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <Badge key={tag} className="transition-colors group-hover:border-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {text.details[project.id as keyof typeof text.details] ?? project.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Image Enlargement Modal */}
      <ImageZoomModal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src || ''}
        alt={selectedImage?.alt || ''}
        title={selectedImage?.title}
        subtitle={selectedImage?.subtitle}
        locale={locale}
      />
    </>
  );
}
