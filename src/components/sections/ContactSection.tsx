'use client';

import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Contact } from '@/core/domain/types';
import Reveal from '@/components/effects/Reveal';
import { getMessages, type Locale } from '@/i18n/messages';

function renderContactIcon(iconName: string): ReactNode {
  switch (iconName) {
    case 'Phone':
      return <Phone size={16} className="translate-y-[-0.5px]" />;
    case 'Linkedin':
      return <i aria-hidden="true" className="devicon-linkedin-plain text-sm" />;
    case 'Github':
      return <i aria-hidden="true" className="devicon-github-original text-sm" />;
    case 'Mail':
    default:
      return <Mail size={16} className="translate-y-[-0.5px]" />;
  }
}

export default function ContactSection({ contacts, locale }: { contacts: Contact[]; locale: Locale }) {
  const text = getMessages(locale).contact;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId(current => (current === id ? null : current));
      }, 2000);
    } catch {
      // Fallback silent if clipboard is unavailable
    }
  };

  return (
    <section id="contatos" aria-labelledby="contact-title" className="section-shell py-24 md:py-32">
      <Reveal delay={0.05}>
        <p className="eyebrow mb-6">
          <span className="text-primary">03 /</span> {text.eyebrow}
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Reveal delay={0.14}>
            <h2 id="contact-title" className="section-heading">
              {text.headingA}
              <br />
              <span className="serif-accent text-[1.05em]">{text.headingB}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-muted-foreground">
              {text.description}
            </p>
          </Reveal>
        </div>

        <div className="lg:pt-2">
          {contacts.map((contact, index) => {
            const isCopied = copiedId === contact.id;
            const isCopyable = contact.category === 'primary';

            return (
              <Reveal key={contact.id} delay={0.08 + index * 0.07}>
                <div className="group flex items-center justify-between gap-3 border-b border-border py-5 transition-colors hover:border-primary/40">
                  <motion.a
                    href={contact.href}
                    target={contact.href.startsWith('https:') ? '_blank' : undefined}
                    rel={contact.href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex min-w-0 flex-1 items-center justify-between gap-4 rounded-md transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/80 text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
                        {renderContactIcon(contact.iconName)}
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow mb-1">{contact.platform}</span>
                        <span className="block break-words text-lg font-medium tracking-tight md:text-xl">
                          {contact.value}
                        </span>
                      </span>
                    </span>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 translate-y-[-0.5px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </motion.a>

                  {isCopyable && (
                    <motion.button
                      type="button"
                      onClick={() => handleCopy(contact.id, contact.value)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      aria-label={text.copy(contact.platform)}
                      className="relative flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 font-mono text-[10px] tracking-wider uppercase text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isCopied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1 text-primary"
                          >
                            <Check size={13} className="translate-y-[-0.5px]" />
                            <span className="hidden sm:inline">{text.copied}</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1"
                          >
                            <Copy size={13} className="translate-y-[-0.5px]" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
