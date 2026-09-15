'use client';

import { useState } from 'react';
import { Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/reduxHooks';
import { toggleTheme } from '@/redux/slices/themeSlice';

const items = [
  { name: 'Início', href: '#inicio', icon: Home },
  { name: 'Projetos', href: '#projetos', icon: Briefcase },
  { name: 'Sobre', href: '#sobre', icon: User },
  { name: 'Contatos', href: '#contatos', icon: Mail },
];

export default function Dock() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ y: 30, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        bounce: 0.15,
        delay: 0.2,
      }}
      aria-label="Atalhos e aparência"
      className="fixed bottom-5 left-1/2 z-50 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-md"
    >
      {items.map(({ name, href, icon: Icon }) => (
        <div
          key={name}
          className="relative"
          onMouseEnter={() => setHoveredItem(name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <AnimatePresence>
            {hoveredItem === name && (
              <motion.span
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background/95 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground shadow-sm backdrop-blur-sm"
              >
                {name}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.a
            href={href}
            aria-label={name}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Icon size={18} />
          </motion.a>
        </div>
      ))}

      <span className="mx-1 h-5 w-px bg-border/80" />

      <div
        className="relative"
        onMouseEnter={() => setHoveredItem('theme')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <AnimatePresence>
          {hoveredItem === 'theme' && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background/95 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground shadow-sm backdrop-blur-sm"
            >
              {mode === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label={mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex size-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ rotate: -180, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 180, scale: 0.4, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 18,
                bounce: 0.3,
              }}
              className="flex items-center justify-center"
            >
              {mode === 'dark' ? (
                <Sun size={19} className="transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon size={19} className="transition-transform duration-300 hover:-rotate-12" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}
