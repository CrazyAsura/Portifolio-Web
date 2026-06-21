'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/core/domain/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { ease: [0.16, 1, 0.3, 1] as const, duration: 1.0 } 
    }
  };

  return (
    <Box 
      id="projetos" 
      component="section"
      sx={{ 
        py: { xs: 15, md: 22 }, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Glow */}
      <Box 
        className="ambient-orb"
        sx={{ 
          top: '40%', 
          right: '10%', 
          width: '350px', 
          height: '350px', 
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          animationDuration: '18s'
        }} 
      />

      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: { xs: 8, md: 12 }, textAlign: 'left' }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 600, 
              letterSpacing: 4,
              display: 'block',
              mb: 1
            }}
          >
            Portfolio
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2.2rem', md: '3.2rem' } 
            }}
          >
            Projetos <Box component="span" sx={{ color: 'primary.main' }}>Recentes</Box>
          </Typography>
        </Box>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={5}>
            {projects.map((project) => (
              <Grid size={{ xs: 12, md: 6 }} key={project.id}>
                <motion.div variants={cardVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    component="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel shimmer-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.01)',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                        borderColor: 'primary.main',
                      },
                      '.dark &:hover': {
                        boxShadow: '0 15px 40px rgba(212, 175, 55, 0.08)',
                      }
                    }}
                  >
                    {/* Image Wrapper */}
                    <Box 
                      sx={{ 
                        overflow: 'hidden', 
                        position: 'relative', 
                        aspectRatio: '16/10',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                          '.shimmer-container:hover &': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ 
                            objectFit: 'cover', 
                            objectPosition: project.objectPosition || 'center' 
                          }}
                        />
                      </Box>
                      
                      {/* Category overlay badge */}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 16, 
                          left: 16,
                          bgcolor: 'rgba(7, 7, 8, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: 'primary.main',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          px: 2,
                          py: 0.75,
                          borderRadius: 0,
                        }}
                      >
                        {project.category}
                      </Box>

                      {/* Icon link indicator on hover */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          right: 16,
                          width: 36,
                          height: 36,
                          borderRadius: 0,
                          bgcolor: 'primary.main',
                          color: 'background.default',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transform: 'scale(0.8) translateY(10px)',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          '.shimmer-container:hover &': {
                            opacity: 1,
                            transform: 'scale(1) translateY(0)',
                          }
                        }}
                      >
                        <ExternalLink size={16} />
                      </Box>
                    </Box>

                    {/* Content Box */}
                    <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 2, 
                          fontSize: { xs: '1.4rem', md: '1.6rem' },
                          transition: 'color 0.3s ease',
                          '.shimmer-container:hover &': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {project.title}
                      </Typography>

                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          fontWeight: 300, 
                          lineHeight: 1.7,
                          mb: 4,
                          flexGrow: 1
                        }}
                      >
                        {project.description}
                      </Typography>

                      {/* Tags list */}
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                        {project.tags.map((tag) => (
                          <Box
                            key={tag}
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: 'text.secondary',
                              border: '1px solid',
                              borderColor: 'divider',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 0,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: 'primary.main',
                                color: 'primary.main',
                              }
                            }}
                          >
                            <Code size={10} />
                            {tag}
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
