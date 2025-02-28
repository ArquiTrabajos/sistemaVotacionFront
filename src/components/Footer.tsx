import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          © {new Date().getFullYear()} Sistema de Votación. Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Votación Segura y Transparente
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 