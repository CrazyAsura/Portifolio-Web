'use client';

import { Provider } from 'react-redux';
import { MotionConfig } from 'motion/react';
import { store, initializePersistence } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks/reduxHooks';
import { useEffect } from 'react';
import CustomCursor from '@/components/effects/CustomCursor';
import SmoothScroll from '@/components/effects/SmoothScroll';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(state => state.theme.mode);
  const rehydrated = useAppSelector(state => state._persist?.rehydrated);
  useEffect(() => {
    if (!rehydrated) return;
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;
  }, [mode, rehydrated]);
  return <MotionConfig reducedMotion="user">{children}<SmoothScroll /><CustomCursor /></MotionConfig>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => { initializePersistence(); }, []);
  return <Provider store={store}><ThemeWrapper>{children}</ThemeWrapper></Provider>;
}
