import { createTheme, ThemeOptions } from '@mui/material/styles';

// Cores de luxo: Dourado, Preto e Branco
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F9F1D7';
const GOLD_DARK = '#AA8811';

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: GOLD,
      light: GOLD_LIGHT,
      dark: GOLD_DARK,
      contrastText: mode === 'light' ? '#000000' : '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#000000' : '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#000000',
      paper: mode === 'light' ? '#fcfcfc' : '#0a0a0a',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#444444' : '#cccccc',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(212, 175, 55, 0.2)',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Estilo mais moderno e luxuoso (bordas retas)
          padding: '10px 24px',
        },
        containedPrimary: {
          backgroundColor: GOLD,
          color: '#000',
          '&:hover': {
            backgroundColor: GOLD_DARK,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#000000',
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
      },
    },
  },
});
