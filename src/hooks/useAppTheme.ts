import { useMemo } from 'react';

import { useMediaQuery } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function useAppTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  responsiveFontSizes(theme);

  return theme;
}
