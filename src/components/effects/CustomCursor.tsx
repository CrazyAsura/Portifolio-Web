'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';

type CursorMode = 'default' | 'interactive' | 'zoom' | 'view';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isPointerDown, setIsPointerDown] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 460, mass: 0.38 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

    const disableCursor = () => {
      document.documentElement.classList.remove('custom-cursor');
      setIsVisible(false);
    };

    if (!media.matches) {
      disableCursor();
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!media.matches) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      document.documentElement.classList.add('custom-cursor');
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        return;
      }

      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        const explicitMode = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (explicitMode === 'zoom') {
          setCursorMode('zoom');
        } else if (explicitMode === 'view') {
          setCursorMode('view');
        } else {
          setCursorMode('interactive');
        }
        return;
      }

      if (target.closest('[data-cursor="zoom"], .portrait-surface')) {
        setCursorMode('zoom');
        return;
      }

      if (target.closest('[data-cursor="view"], .project-link')) {
        setCursorMode('view');
        return;
      }

      setCursorMode('default');
    };

    const onMouseDown = () => setIsPointerDown(true);
    const onMouseUp = () => setIsPointerDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => {
      if (media.matches) setIsVisible(true);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key.startsWith('Arrow') || e.key === 'Enter' || e.key === ' ') {
        disableCursor();
      }
    };
    const onMediaChange = () => {
      if (!media.matches) disableCursor();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    media.addEventListener('change', onMediaChange);

    return () => {
      disableCursor();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      media.removeEventListener('change', onMediaChange);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const isExpanded = cursorMode === 'zoom' || cursorMode === 'view';
  const isInteractive = cursorMode !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointerDown ? 0.84 : isExpanded ? 1.75 : isInteractive ? 1.45 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 480, damping: 28 }}
        className={`cursor-ring pointer-events-none flex size-8 items-center justify-center rounded-full border transition-colors duration-200 ${
          isExpanded
            ? 'border-primary bg-primary/15 text-primary backdrop-blur-[2px]'
            : isInteractive || isPointerDown
              ? 'border-primary bg-primary/8'
              : 'border-primary/70'
        }`}
      >
        <AnimatePresence mode="wait">
          {cursorMode === 'zoom' && (
            <motion.span
              key="zoom"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 0.65 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <Maximize2 size={14} />
            </motion.span>
          )}
          {cursorMode === 'view' && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 0.68 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <ArrowUpRight size={15} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointerDown ? 0.65 : isExpanded ? 0.25 : isInteractive ? 0.45 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 620, damping: 35 }}
        className="cursor-dot pointer-events-none size-1.5 rounded-full bg-primary shadow-xs"
      />
    </div>
  );
}
