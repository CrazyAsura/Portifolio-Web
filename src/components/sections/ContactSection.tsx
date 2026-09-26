'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { Contact } from '@/core/domain/types';
import Reveal from '@/components/effects/Reveal';

export default function ContactSection({ contacts }: { contacts: Contact[] }) {
  return (
    <section id="contatos" aria-labelledby="contact-title" className="section-shell py-24 md:py-32">
      <Reveal delay={0.05}>
        <p className="eyebrow mb-6">
          <span className="text-primary">03 /</span> Próxima conversa
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Reveal delay={0.15}>
            <h2 id="contact-title" className="section-heading">
              Tem algo<br />
              <span className="serif-accent">em mente?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-muted-foreground">
              Um projeto, uma oportunidade ou uma boa ideia. Vamos conversar sobre o próximo passo.
            </p>
          </Reveal>
        </div>

        <div className="lg:pt-2">
          {contacts.map((contact, index) => (
            <Reveal key={contact.id} delay={0.1 + index * 0.08}>
              <motion.a
                href={contact.href}
                target={contact.href.startsWith('https:') ? '_blank' : undefined}
                rel={contact.href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-md"
              >
                <span className="min-w-0">
                  <span className="eyebrow mb-1">{contact.platform}</span>
                  <span className="break-words text-lg tracking-tight font-medium md:text-xl">
                    {contact.value}
                  </span>
                </span>
                <span className="flex size-10 items-center justify-center rounded-full border border-border/60 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10">
                  <ArrowUpRight
                    size={19}
                    className="shrink-0 translate-y-[-0.5px] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
