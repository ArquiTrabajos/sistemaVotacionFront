import { Alert, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo3.png';
import Footer from '../components/Footer';
import authService from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Verificar si ya está autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const role = authService.getRole();
      if (role === 'ROLE_ADMIN') {
        navigate('/panel');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clicked) return; // Prevenir múltiples clicks
    
    setError('');
    setLoading(true);
    setClicked(true);

    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        const role = response.user.role;
        if (role === 'ROLE_ADMIN') {
          navigate('/panel');
        } else {
          // Si no es admin, redirigir a página no autorizada
          navigate('/unauthorized');
        }
      }
    } catch (err) {
      setError('Credenciales inválidas');
      setClicked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 10
      }}>
        <Card sx={{ 
          maxWidth: 400, 
          width: '100%', 
          mx: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 4
            }}>
              <img 
                src={logo}
                alt="Logo Sistema de Votación"
                style={{ 
                  width: 150,
                  marginBottom: 16,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                color="primary" 
                align="center"
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: '-0.5px'
                }}
              >
                Panel Administrativo
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  animation: 'slideIn 0.3s ease-out'
                }}
              >
                {error}
              </Alert>
            )}

            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ 
                '& .MuiTextField-root': { 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.2s',
                    '&:hover': {
                      '& > fieldset': {
                        borderColor: 'primary.main',
                      }
                    }
                  }
                }
              }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || clicked}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.2)',
                    transform: 'translateX(-100%)',
                  },
                  '&:hover:not(:disabled)': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:after': {
                      transform: 'translateX(100%)',
                      transition: 'transform 0.6s ease-in-out',
                    }
                  },
                  '&:active:not(:disabled)': {
                    transform: 'translateY(0)',
                  }
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Footer />
    </Box>
  );
};

export default Login; 