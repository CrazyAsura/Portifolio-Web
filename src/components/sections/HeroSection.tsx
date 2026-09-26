'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import HeroAccent from '@/components/effects/HeroAccent';
import Reveal from '@/components/effects/Reveal';
import ImageZoomModal from '@/components/effects/ImageZoomModal';

export default function HeroSection() {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  return (
    <>
      <section id="inicio" aria-labelledby="hero-title" className="section-shell pb-12 pt-10 md:pb-16 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="relative z-10 py-2 lg:py-8">
            <Reveal delay={0.05} direction="up">
              <p className="eyebrow mb-8">
                <span className="h-px w-8 bg-primary" />
                Desenvolvedor full stack
              </p>
            </Reveal>

            <Reveal delay={0.15} direction="up">
              <h1
                id="hero-title"
                className="text-[clamp(3.5rem,6.7vw,6.25rem)] leading-[.98] font-normal tracking-[-.075em]"
              >
                Leon Mendonça<br />
                <span className="serif-accent">Trindade.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Do primeiro detalhe da interface<br className="hidden sm:block" /> à estrutura que faz tudo funcionar.
              </p>
            </Reveal>

            <Reveal delay={0.35} direction="up">
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <motion.a
                    href="#projetos"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group"
                  >
                    Explorar projetos
                    <ArrowUpRight className="translate-y-[-0.5px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1" />
                  </motion.a>
                </Button>
                <Button asChild variant="outline">
                  <motion.a
                    href="#contatos"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    Vamos conversar
                  </motion.a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.45} direction="up">
              <div className="mt-14 flex items-center gap-5">
                <span className="h-px w-9 bg-border" />
                <p className="font-mono text-[10px] tracking-[.1em] text-muted-foreground">
                  CÓDIGO COM INTENÇÃO. DESIGN COM CLAREZA.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="left" className="relative mx-auto w-full max-w-[510px]">
            <motion.div
              onClick={() => setIsPhotoOpen(true)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="portrait-surface group relative aspect-[.91] cursor-pointer overflow-hidden rounded-[32px] border border-border/80 md:rounded-[40px]"
            >
              <Image
                src="/profile-portifolio.jpeg"
                alt="Retrato de Leon Mendonça Trindade"
                fill
                priority
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 510px, 40vw"
                className="portrait-image object-cover"
              />

              <div className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 hover:bg-black/80">
                <Maximize2 size={15} className="translate-y-[-0.5px]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="font-mono text-[10px] tracking-[.15em] opacity-70">ENTRE LÓGICA E CRIATIVIDADE</p>
                <p className="mt-2 text-xl tracking-tight">Construindo o próximo passo.</p>
              </div>
            </motion.div>
            <HeroAccent />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.5 }}
              className="absolute -left-4 top-7 rounded-full border border-border bg-background/90 px-4 py-2.5 font-mono text-[10px] tracking-widest backdrop-blur-sm shadow-sm md:-left-6"
            >
              PORTFÓLIO / 01
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.5} direction="up">
          <div className="mt-14 flex items-center justify-between gap-4 border-y border-border py-5 md:mt-20">
            <motion.a
              href="#projetos"
              whileHover={{ x: 3 }}
              className="eyebrow group transition-colors hover:text-primary"
            >
              Continue explorando
              <ArrowDown size={13} className="transition-transform group-hover:translate-y-0.5" />
            </motion.a>
            <p className="hidden font-mono text-[10px] tracking-[.12em] text-muted-foreground sm:block">
              NEXT.JS <span className="px-3 text-primary">/</span> NESTJS <span className="px-3 text-primary">/</span> TYPESCRIPT
            </p>
          </div>
        </Reveal>
      </section>

      <ImageZoomModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
        src="/profile-portifolio.jpeg"
        alt="Retrato de Leon Mendonça Trindade"
        title="Leon Mendonça Trindade"
        subtitle="Desenvolvedor Full Stack"
      />
    </>
  );
}
