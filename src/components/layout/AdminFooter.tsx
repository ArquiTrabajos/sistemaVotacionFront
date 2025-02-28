import { Facebook, Instagram } from '@mui/icons-material';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import logo from '../../assets/logo3.png';

const AdminFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#002147',
        color: 'white',
        py: 3,
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logo} 
                alt="Logo"
                style={{ 
                  height: '40px',
                  marginRight: '10px',
                  filter: 'brightness(0) invert(1)'
                }} 
              />
              <Typography variant="h6">
                Sistema de Votación
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Link href="/terminos" color="inherit">Términos</Link>
              <Link href="/privacidad" color="inherit">Privacidad</Link>
              <Link href="/contacto" color="inherit">Contacto</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Link href="https://instagram.com" color="inherit">
                <Instagram />
              </Link>
              <Link href="https://facebook.com" color="inherit">
                <Facebook />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ mt: 2 }}
        >
          Desarrollado por Secure SmartData - ClinicAI.co
          <br />
          © {new Date().getFullYear()} ClinicAI. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default AdminFooter; 