'use client';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Github, Linkedin, Phone, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* HERO SECTION */}
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Background Elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '20%', 
            left: '10%', 
            width: '400px', 
            height: '400px', 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
            zIndex: 0
          }} 
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            {/* Foto de Perfil - Agora Primeiro no Grid para aparecer no topo em Mobile */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1/1',
                    maxWidth: { xs: 280, md: 400 },
                    mx: 'auto',
                    filter: 'grayscale(100%)',
                    transition: '0.5s filter',
                    '&:hover': { filter: 'grayscale(0%)' },
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src="/profile-portifolio.jpeg"
                    alt="Leon Mendonça Trindade"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
                {/* Círculo decorativo atrás da foto */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '105%', 
                    height: '105%', 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: '50%',
                    zIndex: -1,
                    opacity: 0.5
                  }} 
                />
              </motion.div>
            </Grid>

            {/* Texto do Hero */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="overline"
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 600, 
                    letterSpacing: 6,
                    fontSize: '0.75rem',
                    mb: 2,
                    display: 'block',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  FULL STACK DEVELOPER
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '3rem', md: '5.5rem' },
                    lineHeight: 0.9,
                    mb: 4,
                    letterSpacing: -3,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Leon Mendonça <br />
                  Trindade
                </Typography>

                <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mb: 4, mx: { xs: 'auto', md: 0 } }} />

                <Typography
                  variant="h5"
                  sx={{ 
                    mb: 6, 
                    maxWidth: '550px', 
                    color: 'text.secondary',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    textAlign: { xs: 'center', md: 'left' },
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  Desenvolvendo experiências digitais de alta performance com foco em arquitetura limpa e design centrado no usuário.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href="#projetos"
                    sx={{ 
                      height: 56,
                      px: 5,
                      fontSize: '0.85rem',
                      letterSpacing: 2,
                      borderRadius: '28px'
                    }}
                  >
                    PROJETOS SELECIONADOS
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component="a"
                    href="#contatos"
                    sx={{ 
                      height: 56,
                      px: 5,
                      fontSize: '0.85rem',
                      letterSpacing: 2,
                      borderColor: 'divider',
                      color: 'text.primary',
                      borderRadius: '28px',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'transparent',
                      }
                    }}
                  >
                    ENTRAR EM CONTATO
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PROJECTS SECTION */}
      <Box id="projetos" sx={{ py: 20, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 12 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 4 }}>
              Portfolio
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Projetos <Box component="span" sx={{ color: 'primary.main' }}>Recentes</Box>
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {[
              {
                title: 'Nestfy',
                category: 'E-commerce Platform',
                description: 'Uma experiência de e-commerce de luxo construída com Next.js e design minimalista.',
                image: '/nestfy-image.jpeg',
                link: 'https://nestfy-1.vercel.app/',
                objectPosition: 'center'
              },
              {
                title: 'Matheus Portfolio',
                category: 'Personal Brand',
                description: 'Desenvolvimento de identidade digital para profissional de psicologia.',
                image: '/matheus-portifolio-image.jpeg',
                link: 'https://portif-lio-matheus.vercel.app/',
                objectPosition: 'top'
              }
            ].map((project, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Box
                    component="a"
                    href={project.link}
                    target="_blank"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover .project-img': { transform: 'scale(1.05)' },
                      '&:hover .project-title': { color: 'primary.main' }
                    }}
                  >
                    <Box sx={{ overflow: 'hidden', mb: 3, position: 'relative', aspectRatio: '16/11', borderRadius: '24px' }}>
                      <Box
                        className="project-img"
                        sx={{
                          width: '100%',
                          height: '100%',
                          transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '24px',
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover', objectPosition: project.objectPosition || 'center' }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 2 }}>
                      {project.category}
                    </Typography>
                    <Typography 
                      className="project-title"
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        mt: 1, 
                        mb: 2, 
                        transition: '0.3s',
                        fontSize: { xs: '1.5rem', md: '2rem' } 
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 300, lineHeight: 1.7 }}>
                      {project.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CONTACT SECTION */}
      <Box id="contatos" sx={{ py: 20, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 4 }}>
              Contato
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 4, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              Vamos criar algo <br /> extraordinário?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 8, fontWeight: 300, maxWidth: 600, mx: 'auto' }}>
              Estou sempre aberto a novos projetos e colaborações interessantes. Sinta-se à vontade para entrar em contato por qualquer canal.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {[
                { icon: <Mail size={20} />, label: 'E-mail', value: 'leoncdzt@gmail.com', href: 'mailto:leoncdzt@gmail.com' },
                { icon: <Phone size={20} />, label: 'WhatsApp', value: '+55 (79) 99957-6753', href: 'https://wa.me/5579999576753' },
                { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'Leon Mendonça', href: 'https://www.linkedin.com/in/leonmendoncatrindade/' },
                { icon: <Github size={20} />, label: 'GitHub', value: '@CrazyAsura', href: 'https://github.com/CrazyAsura' }
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box
                    component="a"
                    href={item.href}
                    target="_blank"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: '0.3s',
                      borderRadius: '16px',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'background.default'
                      }
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mr: 2, display: 'flex' }}>{item.icon}</Box>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
