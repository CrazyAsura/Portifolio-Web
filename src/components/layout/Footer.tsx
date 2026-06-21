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
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
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
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: 2, 
                textTransform: 'uppercase',
                mb: 1.5,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              LEON MENDONÇA <Box component="span" sx={{ color: 'primary.main' }}>TRINDADE</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, textAlign: { xs: 'center', md: 'left' }, lineHeight: 1.7 }}>
              Desenvolvendo experiências digitais elegantes de alta performance com foco em arquitetura limpa e design centrado no usuário.
            </Typography>
          </motion.div>

          <Stack direction="row" spacing={1.5}>
            {[
              { icon: <Github size={20} />, href: 'https://github.com/CrazyAsura', label: 'Github' },
              { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/leonmendoncatrindade/', label: 'LinkedIn' },
              { icon: <Phone size={20} />, href: 'https://wa.me/5579999576753', label: 'WhatsApp' },
              { icon: <Mail size={20} />, href: 'mailto:leoncdzt@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -4 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <IconButton 
                  color="primary" 
                  aria-label={social.label} 
                  component="a" 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0, // Straight modern border to match theme
                    p: 1.5,
                    color: 'text.primary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.main',
                      color: 'background.default'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Stack>
        </Stack>
        
        <Divider sx={{ my: 5, opacity: 0.5 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.5, textAlign: 'center', fontWeight: 500 }}>
            © {currentYear} LEON MENDONÇA TRINDADE. TODOS OS DIREITOS RESERVADOS.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 2, fontWeight: 600, color: 'primary.main' }}>
            DESIGNED FOR EXCELLENCE
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
