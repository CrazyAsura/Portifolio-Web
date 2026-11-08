'use client';

import { useEffect, type ReactNode } from 'react';
import { motion, useAnimate, type HTMLMotionProps } from 'motion/react';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 24,
  ...props
}: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const offset =
      direction === 'up'
        ? { x: 0, y: distance }
        : direction === 'down'
          ? { x: 0, y: -distance }
          : direction === 'left'
            ? { x: distance, y: 0 }
            : direction === 'right'
              ? { x: -distance, y: 0 }
              : { x: 0, y: 0 };

    const playEntrance = () => {
      animate(
        el,
        {
          opacity: [0, 1],
          x: [offset.x, 0],
          y: [offset.y, 0],
        },
        {
          type: 'spring',
          stiffness: 280,
          damping: 28,
          bounce: 0.1,
          delay,
          duration,
        },
      );
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      playEntrance();
      return;
    }

    el.style.opacity = '0';
    el.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          playEntrance();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, delay, direction, distance, duration, scope]);

  return (
    <motion.div ref={scope} className={className} {...props}>
      {children}
    </motion.div>
  );
}
