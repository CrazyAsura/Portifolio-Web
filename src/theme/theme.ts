import { createTheme, ThemeOptions } from '@mui/material/styles';

const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F9F1D7';
const GOLD_DARK = '#AA8811';

// Cinematic Colors: Luxurious Charcoal / Black in Dark Mode and crisp Warm White in Light Mode
export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: GOLD,
      light: GOLD_LIGHT,
      dark: GOLD_DARK,
      contrastText: mode === 'light' ? '#000000' : '#000000', // Gold contrasts best with black text
    },
    secondary: {
      main: mode === 'light' ? '#0f0f11' : '#f5f5f7',
    },
    background: {
      default: mode === 'light' ? '#fbfbfa' : '#070708',
      paper: mode === 'light' ? '#ffffff' : '#0c0c0e',
    },
    text: {
      primary: mode === 'light' ? '#0f0f11' : '#f5f5f7',
      secondary: mode === 'light' ? '#51515c' : '#a1a1aa',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(212, 175, 55, 0.12)',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    h1: { 
      fontWeight: 800, 
      letterSpacing: '-0.04em',
      lineHeight: 1.0,
    },
    h2: { 
      fontWeight: 800, 
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h3: { 
      fontWeight: 700, 
      letterSpacing: '-0.02em',
    },
    h4: { 
      fontWeight: 700, 
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 300,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontWeight: 300,
      letterSpacing: '0.01em',
    },
    body2: {
      fontWeight: 300,
      letterSpacing: '0.01em',
    },
    button: { 
      textTransform: 'uppercase', 
      fontWeight: 600,
      letterSpacing: '0.15em',
      fontSize: '0.8rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Luxury sharp edges style
          padding: '12px 28px',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          }
        },
        containedPrimary: {
          backgroundColor: GOLD,
          color: '#000000',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          },
          '.dark &:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
            boxShadow: '0 10px 20px rgba(212, 175, 55, 0.15)',
          }
        },
        outlinedPrimary: {
          borderColor: GOLD,
          color: GOLD,
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
          },
          '.dark &:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});
