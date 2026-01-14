'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Container } from '@mui/material';
import { Menu as MenuIcon, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/reduxHooks';
import { toggleTheme } from '@/redux/slices/themeSlice';

const navItems = [
  { name: 'Início', href: '#' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contatos', href: '#contatos' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.default', 
        borderBottom: '1px solid',
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'primary.main',
        backdropFilter: 'blur(10px)',
        backgroundImage: 'none'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                fontWeight: 900, 
                color: 'text.primary', 
                cursor: 'pointer',
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontSize: { xs: '1rem', md: '1.2rem' }
              }}
            >
              LEON MENDONÇA <Box component="span" sx={{ color: 'primary.main' }}>TRINDADE</Box>
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    component={Link}
                    href={item.href}
                    sx={{ 
                      color: 'text.primary', 
                      px: 2,
                      fontSize: '0.9rem',
                      letterSpacing: 1,
                      fontWeight: 600,
                      '&:hover': { 
                        color: 'primary.main',
                        bgcolor: 'transparent'
                      } 
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Theme Toggle Button */}
            <IconButton 
              onClick={() => dispatch(toggleTheme())} 
              sx={{ 
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 0,
                width: 40,
                height: 40,
                '&:hover': { bgcolor: 'primary.main', color: 'background.default' }
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
                  {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </IconButton>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '100%', 
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          },
        }}
      >
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'primary.main' }}>
            <X size={32} />
          </IconButton>
        </Box>
        <List sx={{ textAlign: 'center' }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{ py: 3 }}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontSize: '2rem', 
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
