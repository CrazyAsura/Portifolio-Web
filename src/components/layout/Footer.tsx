'use client';
import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Divider } from '@mui/material';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: 2, 
                textTransform: 'uppercase',
                mb: 1,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              LEON MENDONÇA <Box component="span" sx={{ color: 'primary.main' }}>TRINDADE</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 350, textAlign: { xs: 'center', md: 'left' } }}>
              Transformando ideias complexas em experiências digitais elegantes e de alto impacto. Especialista em Full Stack e UI/UX.
            </Typography>
          </motion.div>

          <Stack direction="row" spacing={2}>
            {[
              { icon: <Github size={22} />, href: 'https://github.com/CrazyAsura', label: 'Github' },
              { icon: <Linkedin size={22} />, href: 'https://www.linkedin.com/in/leonmendoncatrindade/', label: 'LinkedIn' },
              { icon: <Phone size={22} />, href: 'https://wa.me/5579999576753', label: 'WhatsApp' },
              { icon: <Mail size={22} />, href: 'mailto:leonmendonca@example.com', label: 'Email' },
            ].map((social, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }} 
                whileTap={{ scale: 0.9 }}
              >
                <IconButton 
                  color="primary" 
                  aria-label={social.label} 
                  component="a" 
                  href={social.href} 
                  target="_blank"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0,
                    p: 1.5,
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Stack>
        </Stack>
        
        <Divider sx={{ my: 4, opacity: 0.5 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textAlign: 'center' }}>
            © {currentYear} LEON MENDONÇA TRINDADE. TODOS OS DIREITOS RESERVADOS.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1 }}>
            DESIGNED FOR EXCELLENCE
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
