'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Maximize2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Button } from '@/components/ui/button';
import HeroAccent from '@/components/effects/HeroAccent';
import Reveal from '@/components/effects/Reveal';
import ImageZoomModal from '@/components/effects/ImageZoomModal';
import { getMessages, type Locale } from '@/i18n/messages';

export default function HeroSection({ locale }: { locale: Locale }) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const text = getMessages(locale).hero;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 260, damping: 24 });
  const springY = useSpring(tiltY, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4.5, 4.5]);

  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(x);
    tiltY.set(y);
  };

  const handlePortraitLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <>
      <section id="inicio" aria-labelledby="hero-title" className="section-shell pb-12 pt-10 md:pb-16 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="relative z-10 py-2 lg:py-8">
            <Reveal delay={0.05} direction="up">
              <p className="eyebrow mb-8">
                <span className="h-px w-8 bg-primary" />
                {text.role}
              </p>
            </Reveal>

            <Reveal delay={0.12} direction="up">
              <h1
                id="hero-title"
                className="text-[clamp(3.4rem,6.7vw,6.25rem)] leading-[.96] font-normal tracking-[-.075em]"
              >
                Leon Mendonça<br />
                <span className="serif-accent text-[1.06em]">Trindade.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2} direction="up">
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                {text.intro}
              </p>
            </Reveal>

            <Reveal delay={0.28} direction="up">
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <motion.a
                    href="#projetos"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group"
                  >
                    {text.explore}
                    <ArrowUpRight className="translate-y-[-0.5px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1" />
                  </motion.a>
                </Button>
                <Button asChild variant="outline">
                  <motion.a
                    href="#contatos"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {text.talk}
                  </motion.a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.36} direction="up">
              <div className="mt-14 flex items-center gap-5">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-9 origin-left bg-primary/60"
                />
                <p className="font-mono text-[10px] tracking-[.1em] text-muted-foreground">
                  {text.motto}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} direction="left" className="relative mx-auto w-full max-w-[510px]">
            <motion.div
              data-cursor="zoom"
              onClick={() => setIsPhotoOpen(true)}
              onMouseMove={handlePortraitMove}
              onMouseLeave={handlePortraitLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1100,
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="portrait-surface group relative aspect-[.91] cursor-pointer overflow-hidden rounded-[32px] border border-border/80 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] transition-colors hover:border-primary/45 md:rounded-[40px]"
            >
              <Image
                src="/profile-portifolio.jpeg"
                alt={text.portrait}
                fill
                priority
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 510px, 40vw"
                className="portrait-image object-cover"
              />

              <div className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 hover:bg-black/80">
                <Maximize2 size={15} className="translate-y-[-0.5px]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="font-mono text-[10px] tracking-[.15em] text-primary/90">{text.caption}</p>
                <p className="mt-2 text-xl tracking-tight font-medium">{text.nextStep}</p>
              </div>
            </motion.div>

            <HeroAccent locale={locale} />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.45 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-4 py-2.5 font-mono text-[10px] tracking-widest shadow-sm backdrop-blur-md md:-left-6 md:top-7"
            >
              <span className="mr-2 inline-block size-1.5 rounded-full bg-primary align-middle" />
              {text.portfolio}
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.42} direction="up">
          <div className="mt-14 flex items-center justify-between gap-4 border-y border-border py-5 md:mt-20">
            <motion.a
              href="#projetos"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="eyebrow group transition-colors hover:text-primary"
            >
              {text.continue}
              <ArrowDown size={13} className="transition-transform duration-200 group-hover:translate-y-0.5 text-primary" />
            </motion.a>
            <div className="hidden items-center gap-3 font-mono text-[10px] tracking-[.12em] text-muted-foreground sm:flex">
              {['NEXT.JS', 'NESTJS', 'TYPESCRIPT'].map((tech, idx) => (
                <span key={tech} className="flex items-center gap-3">
                  {idx > 0 && <span className="text-primary">/</span>}
                  <span className="transition-colors hover:text-foreground">{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <ImageZoomModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
        src="/profile-portifolio.jpeg"
        alt={text.portrait}
        title="Leon Mendonça Trindade"
        subtitle={text.modalSubtitle}
        locale={locale}
      />
    </>
  );
}
