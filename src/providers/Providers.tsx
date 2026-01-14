'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemeOptions } from '@/theme/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks/reduxHooks';
import { useMemo } from 'react';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);
  
  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouterCacheProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </PersistGate>
    </Provider>
  );
}
