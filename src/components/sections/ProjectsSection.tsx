'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project } from '@/core/domain/types';
import { Badge } from '@/components/ui/badge';
import Reveal from '@/components/effects/Reveal';
import ImageZoomModal from '@/components/effects/ImageZoomModal';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
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
              <span className="text-primary">01 /</span> Trabalhos selecionados
            </p>
            <h2 id="projects-title" className="section-heading">
              Ideias que viraram<br />
              <span className="serif-accent">experiência.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-[250px] text-sm leading-relaxed text-muted-foreground">
              Produtos, interfaces e sistemas.<br />
              Uma seleção do que venho construindo.
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
              <div className="group rounded-[28px]">
                <div
                  className={`relative overflow-hidden rounded-[24px] border border-border bg-card shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg ${
                    index === 0 ? 'aspect-[1.35] md:aspect-[2.25]' : 'aspect-[1.5]'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`Interface do projeto ${project.title}`}
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
                    aria-label={`Visitar ${project.title} (abre em nova aba)`}
                    className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ArrowUpRight size={19} />
                  </motion.a>

                  {/* Top-Left: Zoom / Enlarge Button */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setSelectedImage({
                        src: project.image,
                        alt: `Interface do projeto ${project.title}`,
                        title: project.title,
                        subtitle: `0${index + 1} / ${project.category}`,
                      })
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={`Ampliar imagem de ${project.title}`}
                    className="absolute left-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white opacity-80 backdrop-blur-md transition-all hover:opacity-100 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Maximize2 size={17} />
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
                  {project.description}
                </p>
              </div>
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
      />
    </>
  );
}
