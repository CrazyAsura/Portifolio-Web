'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Database, Shield, GraduationCap, PenTool } from 'lucide-react';

export default function AboutSection() {
  const transitionConfig = { ease: [0.16, 1, 0.3, 1] as const, duration: 1.0 };

  const techCategories = [
    {
      title: 'Frontend & Mobile',
      icon: <Code2 size={16} className="text-gold" />,
      skills: ['Next.js', 'Expo', 'React Query', 'Zod', 'React Hook Form', 'Redux Toolkit']
    },
    {
      title: 'Backend & Integrações',
      icon: <Shield size={16} className="text-gold" />,
      skills: ['NestJS', 'JWT', 'Websockets', 'Kafka', 'Redis', 'Argon2']
    },
    {
      title: 'Bancos de Dados',
      icon: <Database size={16} className="text-gold" />,
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server']
    },
    {
      title: 'Design & UML Diagrams',
      icon: <PenTool size={16} className="text-gold" />,
      skills: ['Figma', 'Framer', 'DBDiagram', 'Excalidraw']
    }
  ];

  return (
    <Box 
      id="sobre" 
      component="section"
      sx={{ 
        py: { xs: 15, md: 22 }, 
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 8, md: 10 }} alignItems="flex-start">
          
          {/* Left Column: Biography & Stats */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={transitionConfig}
            >
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
                Sobre Mim
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 4, 
                  fontSize: { xs: '2.2rem', md: '3.2rem' } 
                }}
              >
                Transformando ideias em <Box component="span" sx={{ color: 'primary.main' }}>Realidade Digital</Box>
              </Typography>
              
              <Stack spacing={3} sx={{ color: 'text.secondary', mb: 6 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                  Sou um <strong>Desenvolvedor Full Stack</strong> apaixonado por engenharia de software e design de interfaces, buscando sempre o equilíbrio perfeito entre estética e solidez estrutural. Minha paixão começou cedo, motivada pelo desejo de construir soluções inteligentes e impactantes.
                </Typography>
                
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                  Com formação técnica e profissionalizante pelo <strong>Senac</strong>, estruturei minha especialidade em torno do desenvolvimento de software de ponta a ponta, unindo raciocínio lógico apurado e design de sistemas moderno.
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                  Tenho ampla experiência com ferramentas poderosas de gerenciamento de estado global e fluxos de dados reativos, além de dominar a modelagem estruturada e não-estruturada de bancos de dados. Meu foco principal está em escalabilidade de sistemas, tempo de resposta otimizado e interfaces responsivas de altíssima qualidade.
                </Typography>
              </Stack>

              {/* Statistics Grid */}
              <Grid container spacing={3}>
                {[
                  { value: '+2 Anos', label: 'Estudo Intensivo' },
                  { value: '10+', label: 'Projetos Criados' },
                  { value: 'C1', label: 'Inglês Avançado' }
                ].map((stat, idx) => (
                  <Grid size={{ xs: 4 }} key={idx}>
                    <Box sx={{ borderLeft: '2px solid', borderColor: 'primary.main', pl: 2 }}>
                      <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mt: 0.5 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

            </motion.div>
          </Grid>

          {/* Right Column: Tech Stack & Education */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={transitionConfig}
            >
              <Box 
                className="glass-panel"
                sx={{ 
                  p: { xs: 4, md: 5 }, 
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
                  position: 'relative'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    letterSpacing: 0.5
                  }}
                >
                  <Sparkles size={18} className="text-gold" /> Habilidades Técnicas
                </Typography>
                
                {/* Tech Stack Groups */}
                <Stack spacing={4}>
                  {techCategories.map((cat, idx) => (
                    <Box key={idx}>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 2, 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: 1
                        }}
                      >
                        {cat.icon} {cat.title}
                      </Typography>
                      <Grid container spacing={1.5}>
                        {cat.skills.map((skill) => (
                          <Grid size={{ xs: 6, sm: 6 }} key={skill}>
                            <Box 
                              sx={{ 
                                p: 1.5, 
                                border: '1px solid', 
                                borderColor: 'divider', 
                                background: 'rgba(255, 255, 255, 0.02)',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'default',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  color: 'primary.main',
                                  transform: 'translateX(4px)',
                                  background: 'rgba(212, 175, 55, 0.02)'
                                }
                              }}
                            >
                              {skill}
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                </Stack>

                {/* Education Block inside right card */}
                <Box sx={{ mt: 5, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontSize: '0.8rem'
                    }}
                  >
                    <GraduationCap size={18} className="text-gold" /> Educação & Certificações
                  </Typography>
                  <Stack spacing={2.5}>
                    {[
                      { institution: 'Senac', course: 'Informática Básica' },
                      { institution: 'Senac', course: 'Lógica de Programação' },
                      { institution: 'Senac', course: 'Programador Web' },
                      { institution: 'Senac', course: 'Programador Full Stack' }
                    ].map((edu, index) => (
                      <Box key={index}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.9rem' }}>
                          • {edu.institution}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', pl: 2 }}>
                          {edu.course}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

              </Box>
            </motion.div>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
