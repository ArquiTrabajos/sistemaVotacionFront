import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Container, Divider, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoVotacion from '../../assets/LogoVotacion.webp.webp';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(1),
  '& a': {
    color: '#fff',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 0.8
    }
  }
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  '& a': {
    color: '#fff',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img 
            src={LogoVotacion} 
            alt="Logo Votación" 
            style={{ 
              height: '40px',
              filter: 'brightness(0) invert(1)'
            }} 
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Sistema de Votación
          </Typography>
        </Box>
        
        <Divider sx={{ width: '100%', borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <FooterLinks>
          <Link href="#">Términos</Link>
          <Link href="#">Privacidad</Link>
          <Link href="#">Contacto</Link>
        </FooterLinks>

        <SocialIcons>
          <Link href="#" target="_blank" aria-label="Instagram">
            <InstagramIcon />
          </Link>
          <Link href="#" target="_blank" aria-label="Facebook">
            <FacebookIcon />
          </Link>
        </SocialIcons>

        <Box sx={{ textAlign: 'center', opacity: 0.8 }}>
          <Typography variant="body2">
            Desarrollado por Secure SmartData - ClinicAI.co
          </Typography>
          <Typography variant="caption">
            © {new Date().getFullYear()} ClinicAI. Todos los derechos reservados.
          </Typography>
        </Box>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 