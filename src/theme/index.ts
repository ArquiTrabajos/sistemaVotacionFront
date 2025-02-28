import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647', // Azul marino oscuro
      light: '#144272', // Azul marino medio
      dark: '#051B2C', // Azul marino más oscuro
    },
    secondary: {
      main: '#2C74B3', // Azul acento
      light: '#5499C7', // Azul claro
      dark: '#205686', // Azul oscuro
    },
    background: {
      default: '#F8FBFF', // Blanco espuma muy claro
      paper: '#FFFFFF', // Blanco puro
    },
    text: {
      primary: '#0A2647', // Azul marino oscuro para texto
      secondary: '#205686', // Azul oscuro para texto secundario
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A2647',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", "Helvetica", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
}); 