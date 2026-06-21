'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/reduxHooks';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { useMounted } from '@/hooks/useMounted';

const dockItems = [
  { name: 'Início', href: '#', icon: Home },
  { name: 'Sobre', href: '#sobre', icon: User },
  { name: 'Projetos', href: '#projetos', icon: Briefcase },
  { name: 'Contatos', href: '#contatos', icon: Mail },
];

export default function Dock() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const mounted = useMounted();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <Box
        component={motion.div}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="glass-panel"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
          px: { xs: 2.5, sm: 3 },
          py: 1.5,
          borderRadius: '32px', // Rounded pill style like macOS dock
          boxShadow: mode === 'light' ? '0 10px 40px rgba(0, 0, 0, 0.08)' : '0 10px 40px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'auto',
          maxWidth: '90vw',
          width: 'max-content',
        }}
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <Box
              key={item.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => handleScroll(e, item.href)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Tooltip bubble (Apple style) */}
              <AnimatePresence>
                {isHovered && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    sx={{
                      position: 'absolute',
                      bgcolor: mode === 'light' ? '#0f0f11' : '#f5f5f7',
                      color: mode === 'light' ? '#ffffff' : '#000000',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                      zIndex: 1001,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: 8,
                        height: 8,
                        bgcolor: mode === 'light' ? '#0f0f11' : '#f5f5f7',
                      }
                    }}
                  >
                    {item.name}
                  </Box>
                )}
              </AnimatePresence>

              {/* Icon Container with magnification effect */}
              <Box
                component={motion.div}
                animate={{
                  scale: isHovered ? 1.25 : 1,
                  y: isHovered ? -6 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18,
                }}
                sx={{
                  width: { xs: 40, sm: 46 },
                  height: { xs: 40, sm: 46 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isHovered ? 'primary.main' : 'text.primary',
                  bgcolor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  border: isHovered ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                }}
              >
                <Icon size={20} />
              </Box>
            </Box>
          );
        })}

        {/* Divider in the Dock */}
        <Box 
          sx={{ 
            width: '1px', 
            height: 24, 
            bgcolor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(212, 175, 55, 0.25)' 
          }} 
        />

        {/* Theme toggle icon in the Dock */}
        <Box
          onMouseEnter={() => setHoveredIdx(99)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => dispatch(toggleTheme())}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Theme toggle tooltip */}
          <AnimatePresence>
            {hoveredIdx === 99 && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -42, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                sx={{
                  position: 'absolute',
                  bgcolor: mode === 'light' ? '#0f0f11' : '#f5f5f7',
                  color: mode === 'light' ? '#ffffff' : '#000000',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  zIndex: 1001,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: 8,
                    height: 8,
                    bgcolor: mode === 'light' ? '#0f0f11' : '#f5f5f7',
                  }
                }}
              >
                Alterar Tema
              </Box>
            )}
          </AnimatePresence>

          {/* Theme toggle container */}
          <Box
            component={motion.div}
            animate={{
              scale: hoveredIdx === 99 ? 1.25 : 1,
              y: hoveredIdx === 99 ? -6 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 18,
            }}
            sx={{
              width: { xs: 40, sm: 46 },
              height: { xs: 40, sm: 46 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              bgcolor: hoveredIdx === 99 ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
              transition: 'background-color 0.3s ease',
              border: hoveredIdx === 99 ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
