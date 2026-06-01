import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
  },
});

export function getTheme(mode: 'light' | 'dark') {
  return mode === 'dark' ? darkTheme : lightTheme;
}
