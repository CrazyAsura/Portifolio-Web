'use client';

import { useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { getMessages, type Locale } from '@/i18n/messages';

export default function Header({ locale }: { locale: Locale }) {
  const text = getMessages(locale).nav;
  const nextLocale = locale === 'pt' ? 'en' : 'pt';
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const switchLanguage = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.location.hash) return;
    event.preventDefault();
    window.location.assign(`/${nextLocale}${window.location.hash}`);
  };

  const navLinks = [
    { href: '#projetos', label: text.projects },
    { href: '#sobre', label: text.about },
  ];

  return (
    <header className="section-shell flex h-24 items-center justify-between gap-4">
      <motion.a
        href="#inicio"
        aria-label={`Leon Trindade — ${locale === 'pt' ? 'início' : 'home'}`}
        className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
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

      <nav
        aria-label={text.label}
        onMouseLeave={() => setHoveredNav(null)}
        className="hidden items-center gap-8 text-xs text-muted-foreground md:flex"
      >
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHoveredNav(link.href)}
            className="relative py-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {link.label}
            <AnimatePresence>
              {hoveredNav === link.href && (
                <motion.span
                  layoutId="header-nav-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-primary"
                />
              )}
            </AnimatePresence>
          </a>
        ))}

        <Button variant="outline" size="sm" asChild>
          <motion.a
            href="#contatos"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group"
          >
            {text.contact}{' '}
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </Button>
      </nav>

      <motion.a
        href={`/${nextLocale}`}
        onClick={switchLanguage}
        lang={nextLocale === 'pt' ? 'pt-BR' : 'en'}
        aria-label={text.switchTo}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        className="rounded-full border border-border px-3 py-2 font-mono text-[10px] tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:ml-auto"
      >
        <span className={locale === 'pt' ? 'text-primary font-semibold' : 'text-muted-foreground'}>PT</span>
        <span className="mx-1.5 text-border">|</span>
        <span className={locale === 'en' ? 'text-primary font-semibold' : 'text-muted-foreground'}>EN</span>
      </motion.a>

      <a
        href="#contatos"
        className="font-mono text-[10px] tracking-wider text-primary transition-opacity hover:opacity-80 md:hidden"
      >
        {text.contact.toUpperCase()} ↗
      </a>
    </header>
  );
}
