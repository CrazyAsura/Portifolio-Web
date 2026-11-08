'use client';

import { useEffect, useState, type PointerEvent } from 'react';
import { Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/reduxHooks';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { getMessages, type Locale } from '@/i18n/messages';

const SECTION_IDS = ['inicio', 'projetos', 'sobre', 'contatos'] as const;

export default function Dock({ locale }: { locale: Locale }) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('#inicio');
  const text = getMessages(locale).dock;

  const items = [
    { name: text.home, href: '#inicio', icon: Home },
    { name: text.projects, href: '#projetos', icon: Briefcase },
    { name: text.about, href: '#sobre', icon: User },
    { name: text.contact, href: '#contatos', icon: Mail },
  ];

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight > window.innerHeight && scrollBottom >= docHeight - 48) {
        setActiveSection('#contatos');
        return;
      }

      const triggerLine = window.innerHeight * 0.38;
      let current = '#inicio';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          current = `#${id}`;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handlePointerEnter = (name: string) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setHoveredItem(name);
    }
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setHoveredItem(null);
    }
  };

  return (
    <motion.nav
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
        bounce: 0.12,
        delay: 0.2,
      }}
      style={{ position: 'fixed' }}
      aria-label={text.label}
      className="surface-panel fixed inset-x-0 bottom-5 z-50 mx-auto flex w-max max-w-[calc(100vw-24px)] items-center gap-1 rounded-full p-1.5 backdrop-blur-md"
    >
      {items.map(({ name, href, icon: Icon }) => {
        const isActive = activeSection === href;
        const isHovered = hoveredItem === name;

        return (
          <div
            key={name}
            className="relative"
            onPointerEnter={handlePointerEnter(name)}
            onPointerLeave={handlePointerLeave}
          >
            <AnimatePresence>
              {isHovered && (
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
              aria-current={isActive ? 'location' : undefined}
              onClick={() => setActiveSection(href)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className={`relative flex size-10 items-center justify-center rounded-full transition-[color,transform] duration-200 md:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isHovered && (
                <span className="pointer-events-none absolute inset-0 rounded-full bg-accent transition-opacity duration-150" />
              )}
              <Icon size={17} className="relative z-10 translate-y-[-0.5px]" />
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="active-dot"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto size-1 rounded-full bg-primary"
                  />
                )}
              </AnimatePresence>
            </motion.a>
          </div>
        );
      })}

      <span className="mx-1 h-4 w-px bg-border/80" />

      <div
        className="relative"
        onPointerEnter={handlePointerEnter('theme')}
        onPointerLeave={handlePointerLeave}
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
              {mode === 'dark' ? text.light : text.dark}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label={mode === 'dark' ? text.light : text.dark}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="relative flex size-10 items-center justify-center rounded-full text-primary transition-transform duration-200 md:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {hoveredItem === 'theme' && (
            <span className="pointer-events-none absolute inset-0 rounded-full bg-accent transition-opacity duration-150" />
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
