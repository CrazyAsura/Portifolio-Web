'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { getMessages, type Locale } from '@/i18n/messages';
import type { MouseEvent } from 'react';

export default function Header({ locale }: { locale: Locale }) {
  const text = getMessages(locale).nav;
  const nextLocale = locale === 'pt' ? 'en' : 'pt';
  const switchLanguage = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.location.hash) return;
    event.preventDefault();
    window.location.assign(`/${nextLocale}${window.location.hash}`);
  };
  return (
    <header className="section-shell flex h-24 items-center justify-between gap-4">
      <motion.a
        href="#inicio"
        aria-label={`Leon Trindade — ${locale === 'pt' ? 'início' : 'home'}`}
        className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-full"
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.span
          whileHover={{ rotate: 12, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex size-10 items-center justify-center rounded-full border border-primary/50 font-serif text-xl italic text-primary transition-colors group-hover:border-primary group-hover:bg-primary/10"
        >
          lt.
        </motion.span>
        <span className="text-sm font-medium tracking-tight">
          Leon Trindade<span className="text-primary">.</span>
        </span>
      </motion.a>

      <nav aria-label={text.label} className="hidden items-center gap-8 text-xs text-muted-foreground md:flex">
        <a
          href="#projetos"
          className="relative py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {text.projects}
        </a>
        <a
          href="#sobre"
          className="relative py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {text.about}
        </a>
        <Button variant="outline" size="sm" asChild>
          <motion.a
            href="#contatos"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {text.contact} <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </Button>
      </nav>

      <a
        href={`/${nextLocale}`}
        onClick={switchLanguage}
        lang={nextLocale === 'pt' ? 'pt-BR' : 'en'}
        aria-label={text.switchTo}
        className="rounded-full border border-border px-3 py-2 font-mono text-[10px] tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:ml-auto"
      >
        <span className={locale === 'pt' ? 'text-primary' : 'text-muted-foreground'}>PT</span>
        <span className="mx-1.5 text-border">|</span>
        <span className={locale === 'en' ? 'text-primary' : 'text-muted-foreground'}>EN</span>
      </a>

      <a
        href="#contatos"
        className="font-mono text-[10px] tracking-wider text-primary transition-opacity hover:opacity-80 md:hidden"
      >
        {text.contact.toUpperCase()} ↗
      </a>
    </header>
  );
}
