'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function HeroAccent() {
  const [time, setTime] = useState<string>('');

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

  return (
    <motion.aside
      aria-label="Status e disponibilidade"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 26, delay: 0.35 }}
      whileHover={{ y: -3 }}
      className="surface-panel mt-5 hidden w-full rounded-2xl p-4 lg:block"
    >
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wide text-foreground">
            Disponível para novos projetos
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          SE, BR {time ? `· ${time}` : ''}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-primary translate-y-[-0.5px]" />
          <span>Full Stack & Systems</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <ShieldCheck size={12} className="text-primary translate-y-[-0.5px]" />
          <span>Clean Arch · TDD</span>
        </div>
      </div>
    </motion.aside>
  );
}
