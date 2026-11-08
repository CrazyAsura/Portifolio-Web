'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { getMessages, type Locale } from '@/i18n/messages';

export default function Footer({ locale }: { locale: Locale }) {
  const text = getMessages(locale).footer;
  return (
    <footer className="border-t border-border pb-32 pt-9">
      <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-full border border-primary/40 font-serif text-sm italic text-primary">
            lt.
          </span>
          <p>© {new Date().getFullYear()} Leon Mendonça Trindade</p>
        </div>

        <motion.a
          href="#inicio"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="group flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 font-mono text-[10px] tracking-wider transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {text.backToTop}
          <ArrowUp size={12} className="text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.a>
      </div>
    </footer>
  );
}
