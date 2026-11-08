'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Maximize2, Sparkles } from 'lucide-react';
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

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

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
            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              {text.description}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            const description =
              text.details[project.id as keyof typeof text.details] ?? project.description;

            const openZoom = () =>
              setSelectedImage({
                src: project.image,
                alt: text.imageAlt(project.title),
                title: project.title,
                subtitle: `0${index + 1} / ${project.category}`,
              });

            return (
              <Reveal
                key={project.id}
                delay={0.1 + (index % 2) * 0.12}
                className={isFeatured ? 'md:col-span-2' : ''}
              >
                <motion.article
                  onMouseMove={handleCardMouseMove}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className={`surface-panel spotlight-card group rounded-[28px] p-2.5 transition-colors hover:border-primary/40 md:p-3.5 ${
                    isFeatured
                      ? 'lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-stretch lg:gap-7 lg:p-4'
                      : 'flex h-full flex-col justify-between'
                  }`}
                >
                  {/* Image Container */}
                  <div
                    data-cursor="zoom"
                    onClick={openZoom}
                    className="relative aspect-[1.5] cursor-pointer overflow-hidden rounded-[20px] border border-border/60 bg-card"
                  >
                    <Image
                      src={project.image}
                      alt={text.imageAlt(project.title)}
                      fill
                      sizes={
                        isFeatured
                          ? '(max-width: 1023px) 90vw, 58vw'
                          : '(max-width: 767px) 90vw, 45vw'
                      }
                      className="project-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      style={{ objectPosition: project.objectPosition || 'center' }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 opacity-75 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Top-Right: External Project Link */}
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
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
                      onClick={e => {
                        e.stopPropagation();
                        openZoom();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                      aria-label={text.zoom(project.title)}
                      className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white opacity-85 backdrop-blur-md transition-all hover:border-white/60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Maximize2 size={15} className="translate-y-[-0.5px]" />
                    </motion.button>

                    <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
                      0{index + 1} / {project.category}
                    </span>
                  </div>

                  {/* Content Panel */}
                  {isFeatured ? (
                    <div className="flex flex-col justify-between px-2 pb-2 pt-5 lg:px-3 lg:py-4">
                      <div>
                        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[.16em] uppercase text-primary">
                          <Sparkles size={12} className="translate-y-[-0.5px]" />
                          <span>{text.featured}</span>
                        </div>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="view"
                          className="project-link inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <h3 className="text-3xl font-medium tracking-[-.045em] transition-colors group-hover:text-primary md:text-4xl">
                            {project.title}
                          </h3>
                        </a>

                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge
                              key={tag}
                              className="bg-background/60 transition-colors group-hover:border-primary/35 group-hover:text-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 border-t border-border/80 pt-5">
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          {text.exploreProject}
                          <ArrowUpRight size={15} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-col justify-between px-2 pb-2 pt-5">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="view"
                            className="project-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <h3 className="text-2xl font-medium tracking-[-.04em] transition-colors group-hover:text-primary md:text-3xl">
                              {project.title}
                            </h3>
                          </a>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(tag => (
                              <Badge
                                key={tag}
                                className="bg-background/50 transition-colors group-hover:border-primary/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.article>
              </Reveal>
            );
          })}
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
