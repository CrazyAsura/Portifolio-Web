'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
    let lenis: Lenis | undefined;
    const update = () => {
      lenis?.destroy();
      lenis = undefined;
      if (media.matches) lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: true });
    };
    update();
    media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); lenis?.destroy(); };
  }, []);
  return null;
}
