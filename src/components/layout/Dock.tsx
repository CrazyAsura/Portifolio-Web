'use client';

import { useState } from 'react';
import { Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/reduxHooks';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { getMessages, type Locale } from '@/i18n/messages';

export default function Dock({ locale }: { locale: Locale }) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const text = getMessages(locale).dock;
  const items = [
    { name: text.home, href: '#inicio', icon: Home },
    { name: text.projects, href: '#projetos', icon: Briefcase },
    { name: text.about, href: '#sobre', icon: User },
    { name: text.contact, href: '#contatos', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: 30, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
        bounce: 0.12,
        delay: 0.2,
      }}
      aria-label={text.label}
      className="surface-panel fixed bottom-5 left-1/2 z-50 flex items-center gap-1 rounded-full p-1.5 backdrop-blur-md"
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
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/80 bg-background/95 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground shadow-sm backdrop-blur-sm"
              >
                {name}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.a
            href={href}
            aria-label={name}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {hoveredItem === name && (
              <motion.span
                layoutId="dock-hover-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <Icon size={17} className="relative z-10 translate-y-[-0.5px]" />
          </motion.a>
        </div>
      ))}

      <span className="mx-1 h-4 w-px bg-border/80" />

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
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/80 bg-background/95 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground shadow-sm backdrop-blur-sm"
            >
              {mode === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => dispatch(toggleTheme())}
                aria-label={mode === 'dark' ? text.light : text.dark}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="relative flex size-10 items-center justify-center rounded-full text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {hoveredItem === 'theme' && (
            <motion.span
              layoutId="dock-hover-pill"
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="absolute inset-0 rounded-full bg-accent"
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 22,
              }}
              className="relative z-10 flex items-center justify-center"
            >
              {mode === 'dark' ? (
                <Sun size={17} className="translate-y-[-0.5px]" />
              ) : (
                <Moon size={17} className="translate-y-[-0.5px]" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}
