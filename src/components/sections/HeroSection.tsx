'use client';
import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export default function HeroSection({ onContactClick, onProjectsClick }: HeroSectionProps) {
  // Apple easeOutExpo curve
  const transitionConfig = { ease: [0.16, 1, 0.3, 1] as const, duration: 1.2 };

  return (
    <Box 
      component="section"
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 12, md: 0 }
      }}
    >
      {/* Cinematic Ambient Glow Orbs */}
      <Box 
        className="ambient-orb"
        sx={{ 
          top: '15%', 
          left: '10%', 
          width: { xs: '250px', md: '500px' }, 
          height: { xs: '250px', md: '500px' }, 
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        }} 
      />
      <Box 
        className="ambient-orb"
        sx={{ 
          bottom: '10%', 
          right: '5%', 
          width: { xs: '200px', md: '450px' }, 
          height: { xs: '200px', md: '450px' }, 
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.08) 0%, transparent 70%)',
          animationDelay: '-5s',
          animationDuration: '20s'
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          
          {/* Text Content Column */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              
              {/* Overline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionConfig, delay: 0.1 }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 0.75,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    mb: 4,
                    background: 'rgba(212, 175, 55, 0.04)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Sparkles size={12} className="text-gold animate-pulse" />
                  <Typography
                    variant="overline"
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 600, 
                      letterSpacing: 3,
                      fontSize: '0.65rem',
                      lineHeight: 1,
                    }}
                  >
                    FULL STACK DEVELOPER
                  </Typography>
                </Box>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionConfig, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5.2rem' },
                    mb: 3,
                    fontWeight: 900,
                  }}
                >
                  Leon Mendonça <br />
                  <Box component="span" sx={{ color: 'primary.main' }}>Trindade</Box>
                </Typography>
              </motion.div>

              {/* Accent Line */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...transitionConfig, delay: 0.4 }}
              >
                <Box 
                  sx={{ 
                    width: 70, 
                    height: 2, 
                    bgcolor: 'primary.main', 
                    mb: 4, 
                    mx: { xs: 'auto', md: 0 },
                    background: 'linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0.2) 100%)'
                  }} 
                />
              </motion.div>

              {/* Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionConfig, delay: 0.3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ 
                    mb: 6, 
                    maxWidth: '560px', 
                    color: 'text.secondary',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  Desenvolvendo sistemas robustos de ponta a ponta. Arquitetura limpa, código escalável e interfaces cinematográficas pensadas para surpreender.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionConfig, delay: 0.4 }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onProjectsClick}
                    endIcon={<ArrowRight size={16} />}
                    sx={{ 
                      height: 54,
                      px: 4.5,
                      fontWeight: 700,
                    }}
                  >
                    Ver Projetos
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onContactClick}
                    sx={{ 
                      height: 54,
                      px: 4.5,
                      fontWeight: 700,
                    }}
                  >
                    Contato
                  </Button>
                </Stack>
              </motion.div>

            </Box>
          </Grid>
          
          {/* Profile Photo Column */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...transitionConfig, delay: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  maxWidth: { xs: 260, sm: 320, md: 380 },
                  mx: 'auto',
                  borderRadius: '50%',
                  p: 1.5,
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(212,175,55,0.02) 50%, rgba(0,0,0,0) 100%)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  '.dark &': {
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    filter: 'grayscale(100%)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': { 
                      filter: 'grayscale(0%)',
                      transform: 'scale(1.02)'
                    },
                  }}
                >
                  <Image
                    src="/profile-portifolio.jpeg"
                    alt="Leon Mendonça Trindade"
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>

                {/* Golden outline orbit animation */}
                <Box
                  component={motion.div}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: '1px dashed rgba(212, 175, 55, 0.25)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
