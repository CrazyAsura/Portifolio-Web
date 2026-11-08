'use client';

import { useEffect, useRef, useState, type ComponentType, type MouseEvent } from 'react';
import { animate, motion } from 'motion/react';
import {
  ClipboardCheck,
  GraduationCap,
  KeyRound,
  LayoutTemplate,
  Lock,
  Network,
  PenTool,
  Radio,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Reveal from '@/components/effects/Reveal';
import { getMessages, type Locale } from '@/i18n/messages';

const deviconSkills: Record<string, string> = {
  'Next.js': 'devicon-nextjs-original',
  Expo: 'devicon-expo-original',
  'Redux Toolkit': 'devicon-redux-original',
  NestJS: 'devicon-nestjs-original',
  'ASP.NET Core': 'devicon-dotnetcore-plain',
  'Java Spring Boot': 'devicon-spring-original',
  Kafka: 'devicon-apachekafka-original',
  Redis: 'devicon-redis-plain',
  MySQL: 'devicon-mysql-original',
  PostgreSQL: 'devicon-postgresql-plain',
  MongoDB: 'devicon-mongodb-plain',
  'SQL Server': 'devicon-microsoftsqlserver-plain',
  Figma: 'devicon-figma-plain',
};

const lucideSkills: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'React Query': RefreshCw,
  Zod: ShieldCheck,
  'React Hook Form': ClipboardCheck,
  JWT: KeyRound,
  WebSockets: Radio,
  Argon2: Lock,
  Framer: LayoutTemplate,
  DBDiagram: Network,
  Excalidraw: PenTool,
};

interface StatCounterProps {
  target?: number;
  prefix?: string;
  suffix?: string;
  fallback: string;
}

function StatCounter({ target, prefix = '', suffix = '', fallback }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof target !== 'number') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let controls: { stop: () => void } | undefined;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          controls = animate(0, target, {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: latest => {
              setDisplay(`${prefix}${Math.round(latest)}${suffix}`);
            },
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [prefix, suffix, target]);

  return <span ref={ref}>{display}</span>;
}

export default function AboutSection({ locale }: { locale: Locale }) {
  const text = getMessages(locale).about;
  const categories = [
    {
      title: text.categories[0],
      skills: ['Next.js', 'Expo', 'React Query', 'Zod', 'React Hook Form', 'Redux Toolkit'],
    },
    {
      title: text.categories[1],
      skills: ['NestJS', 'ASP.NET Core', 'Java Spring Boot', 'JWT', 'WebSockets', 'Kafka', 'Redis', 'Argon2'],
    },
    {
      title: text.categories[2],
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
    },
    {
      title: text.categories[3],
      skills: ['Figma', 'Framer', 'DBDiagram', 'Excalidraw'],
    },
  ];

  const stats: Array<{
    value: string;
    label: string;
    target?: number;
    prefix?: string;
    suffix?: string;
  }> = [
    {
      value: locale === 'pt' ? '+3 anos' : '+3 years',
      target: 3,
      prefix: '+',
      suffix: locale === 'pt' ? ' anos' : ' years',
      label: text.stats[0],
    },
    {
      value: '5+',
      target: 5,
      prefix: '',
      suffix: '+',
      label: text.stats[1],
    },
    {
      value: 'C1',
      label: text.stats[2],
    },
  ];

  const handleCardMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="sobre" aria-labelledby="about-title" className="border-y border-border bg-card py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-5">
              <span className="text-primary">02 /</span> {text.eyebrow}
            </p>
            <h2 id="about-title" className="section-heading">
              {text.headingA}
              <br />
              <span className="serif-accent text-[1.05em]">{text.headingB}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{text.paragraphs[0]}</p>
              <p>{text.paragraphs[1]}</p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-7 sm:gap-4">
              {stats.map(({ value, label, target, prefix, suffix }) => (
                <motion.div
                  key={label}
                  onMouseMove={handleCardMouseMove}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="spotlight-card overflow-hidden rounded-2xl border border-border/70 bg-background/45 p-3.5 transition-colors hover:border-primary/40 sm:p-4"
                >
                  <dt className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-2 text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                    <StatCounter
                      target={target}
                      prefix={prefix}
                      suffix={suffix}
                      fallback={value}
                    />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <motion.div
              onMouseMove={handleCardMouseMove}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="spotlight-card mt-8 overflow-hidden rounded-2xl border border-border bg-background/50 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <GraduationCap size={15} className="translate-y-[-0.5px] text-primary" />
                <p className="eyebrow">{text.education}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {text.educationDetail}
              </p>
            </motion.div>
          </Reveal>
        </div>

        <div className="space-y-7 lg:pt-2">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={0.08 + i * 0.08} className="border-b border-border pb-7">
              <div className="mb-4 flex items-center gap-4">
                <span className="font-mono text-[10px] text-primary">0{i + 1}</span>
                <h3 className="text-lg font-medium tracking-tight">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => {
                  const devicon = deviconSkills[skill];
                  const LucideIcon = lucideSkills[skill];

                  return (
                    <Reveal
                      key={skill}
                      delay={0.08 + i * 0.06 + skillIdx * 0.035}
                      distance={12}
                      duration={0.45}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                      >
                        <Badge className="group/badge bg-background/70 px-3.5 py-1.5 transition-colors hover:border-primary/50 hover:text-foreground">
                          {devicon ? (
                            <i
                              aria-hidden="true"
                              className={`${devicon} mr-2 text-sm text-primary/85 transition-colors group-hover/badge:text-primary`}
                            />
                          ) : LucideIcon ? (
                            <LucideIcon
                              size={13}
                              aria-hidden="true"
                              className="mr-2 translate-y-[-0.5px] text-primary/85 transition-colors group-hover/badge:text-primary"
                            />
                          ) : null}
                          {skill}
                        </Badge>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
