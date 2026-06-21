'use client';
import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Contact } from '@/core/domain/types';

interface ContactSectionProps {
  contacts: Contact[];
}

export default function ContactSection({ contacts }: ContactSectionProps) {
  const transitionConfig = { ease: [0.16, 1, 0.3, 1] as const, duration: 1.0 };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail size={22} />;
      case 'Phone':
        return <Phone size={22} />;
      case 'Linkedin':
        return <Linkedin size={22} />;
      case 'Github':
        return <Github size={22} />;
      default:
        return <Mail size={22} />;
    }
  };

  return (
    <Box 
      id="contatos" 
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
      {/* Ambient orb */}
      <Box 
        className="ambient-orb"
        sx={{ 
          bottom: '10%', 
          left: '15%', 
          width: '350px', 
          height: '350px', 
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%)',
          animationDuration: '22s'
        }} 
      />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={transitionConfig}
          style={{ textAlign: 'center' }}
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
            Contato
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              mt: 1, 
              mb: 3, 
              fontSize: { xs: '2.5rem', md: '3.8rem' },
              lineHeight: 1.1
            }}
          >
            Vamos criar algo <br />
            <Box component="span" sx={{ color: 'primary.main' }}>extraordinário?</Box>
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary', 
              mb: 8, 
              fontWeight: 300, 
              maxWidth: 580, 
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1.05rem', md: '1.15rem' }
            }}
          >
            Estou sempre em busca de novos desafios e parcerias inovadoras. Fique à vontade para entrar em contato através do seu canal preferido.
          </Typography>

          {/* Contacts Grid */}
          <Grid container spacing={3} justifyContent="center">
            {contacts.map((item, index) => (
              <Grid 
                size={{ xs: 12, sm: 6 }} 
                key={item.id}
                component={motion.div}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ...transitionConfig }}
              >
                <Box
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3.5,
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: '20px',
                    textAlign: 'left',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      background: 'background.default',
                    },
                    '.dark &:hover': {
                      boxShadow: '0 10px 30px rgba(212, 175, 55, 0.04)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      color: 'primary.main', 
                      mr: 2.5, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      border: '1px solid',
                      borderColor: 'divider',
                      background: 'rgba(212, 175, 55, 0.04)',
                      transition: 'all 0.3s ease',
                      '.glass-panel:hover &': {
                        borderColor: 'primary.main',
                        background: 'primary.main',
                        color: 'background.default',
                      }
                    }}
                  >
                    {getIcon(item.iconName)}
                  </Box>
                  <Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary', 
                        display: 'block', 
                        textTransform: 'uppercase', 
                        letterSpacing: 1.5,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        mb: 0.5
                      }}
                    >
                      {item.platform}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
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
  );
}
