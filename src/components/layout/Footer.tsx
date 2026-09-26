'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { getMessages, type Locale } from '@/i18n/messages';

export default function Footer({ locale }: { locale: Locale }) {
  const text = getMessages(locale).footer;
  return (
    <footer className="border-t border-border pb-32 pt-7">
      <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-[10px] text-muted-foreground">
        <p>© {new Date().getFullYear()} Leon Mendonça Trindade</p>
        <motion.a
          href="#inicio"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="group flex items-center gap-1.5 font-mono tracking-wider transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        >
          {text.backToTop}
          <ArrowUp size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.a>
      </div>
    </footer>
  );
}
