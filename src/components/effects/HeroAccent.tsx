'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck } from 'lucide-react';
import { getMessages, type Locale } from '@/i18n/messages';

export default function HeroAccent({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<string>('');
  const text = getMessages(locale).hero;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.aside
      aria-label={text.status}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 26, delay: 0.35 }}
      whileHover={{ y: -3 }}
      className="surface-panel spotlight-card mt-4 w-full rounded-2xl p-4 transition-colors hover:border-primary/40 sm:mt-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wide text-foreground">
            {text.availability}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          SE, BR {time ? `· ${time}` : ''}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="translate-y-[-0.5px] text-primary" />
          <span>{text.systems}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <ShieldCheck size={12} className="translate-y-[-0.5px] text-primary" />
          <span>{text.principles}</span>
        </div>
      </div>
    </motion.aside>
  );
}
