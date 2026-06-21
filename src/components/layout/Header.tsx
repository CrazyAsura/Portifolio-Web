'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <AppBar 
      position="absolute" 
      sx={{ 
        bgcolor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        zIndex: 1100,
        pt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
          
          {/* Logo Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h5"
              component="div"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ 
                fontWeight: 900, 
                color: 'text.primary', 
                cursor: 'pointer',
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' }
              }}
            >
              LEON MENDONÇA <Box component="span" sx={{ color: 'primary.main' }}>TRINDADE</Box>
            </Typography>
          </motion.div>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
