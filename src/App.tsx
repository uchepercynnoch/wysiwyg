import React from 'react';

import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

import useAppTheme from './hooks/useAppTheme';
import TestDraftPage from './pages/HomePage';

function App() {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst />
      <CssBaseline />
      <TestDraftPage />
    </ThemeProvider>
  );
}

export default App;
