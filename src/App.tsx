import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider 
        maxSnack={3} 
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
