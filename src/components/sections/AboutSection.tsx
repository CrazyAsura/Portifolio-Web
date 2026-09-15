'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import Reveal from '@/components/effects/Reveal';

const categories = [
  {
    title: 'Frontend & Mobile',
    skills: ['Next.js', 'Expo', 'React Query', 'Zod', 'React Hook Form', 'Redux Toolkit'],
  },
  {
    title: 'Backend & Integrações',
    skills: ['NestJS', 'JWT', 'WebSockets', 'Kafka', 'Redis', 'Argon2'],
  },
  {
    title: 'Bancos de dados',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
  },
  {
    title: 'Design & Diagramas',
    skills: ['Figma', 'Framer', 'DBDiagram', 'Excalidraw'],
  },
];

const stats = [
  { value: '+2 anos', label: 'Estudo intensivo' },
  { value: '10+', label: 'Projetos criados' },
  { value: 'C1', label: 'Inglês avançado' },
];

export default function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="about-title" className="border-y border-border bg-card py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-5">
              <span className="text-primary">02 /</span> Sobre mim
            </p>
            <h2 id="about-title" className="section-heading">
              Atenção ao detalhe.<br />
              <span className="serif-accent">Visão do todo.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Sou Leon, desenvolvedor full stack. Trabalho da interface à modelagem de dados, unindo raciocínio lógico e design de sistemas.
              </p>
              <p>
                Meu foco está em sistemas escaláveis, respostas rápidas e interfaces que funcionam bem em qualquer tela. Gosto de entender o problema inteiro antes de escrever a primeira linha.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-7">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-xl p-2 transition-colors hover:bg-background/40"
                >
                  <dt className="text-[10px] text-muted-foreground">{label}</dt>
                  <dd className="mt-2 text-2xl tracking-tight md:text-3xl font-normal text-foreground">{value}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.35}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="mt-10 rounded-2xl border border-border bg-background/50 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <p className="eyebrow mb-3">Formação / Senac</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Informática Básica · Lógica de Programação<br />
                Programador Web · Programador Full Stack
              </p>
            </motion.div>
          </Reveal>
        </div>

        <div className="space-y-7 lg:pt-2">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={0.1 + i * 0.1} className="border-b border-border pb-7">
              <div className="mb-4 flex items-center gap-4">
                <span className="font-mono text-[10px] text-primary">0{i + 1}</span>
                <h3 className="text-lg tracking-tight font-medium">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Badge className="bg-background/70 px-3.5 py-1.5 transition-colors hover:border-primary/50 hover:text-foreground">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
