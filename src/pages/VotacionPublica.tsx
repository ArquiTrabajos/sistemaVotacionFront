import { AdminPanelSettings, CheckCircle, HowToVote, PersonSearch } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo3.png'; // Importamos el logo
import Footer from '../components/Footer';
import votacionService from '../services/votacion.service';

interface Candidato {
  id: number;
  nombre: string;
  partido: string;
}

const VotacionPublica = () => {
  const [documento, setDocumento] = useState('');
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [yaVoto, setYaVoto] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Detener la animación después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const verificarVoto = async () => {
    if (!documento) {
      setError('Por favor ingrese su documento');
      return;
    }
    if (clicked) return; // Prevenir múltiples clicks
    
    try {
      setLoading(true);
      setClicked(true);
      setError('');
      
      const response = await votacionService.verificarVoto(documento);
      if (response.yaVoto) {
        setYaVoto(true);
        setError('Usted ya ha ejercido su voto');
      } else {
        const candidatosData = await votacionService.getCandidatos();
        setCandidatos(candidatosData);
      }
    } catch (err) {
      setError('Error al verificar el documento');
    } finally {
      setLoading(false);
      setClicked(false);
    }
  };

  const votar = async (candidatoId: number) => {
    try {
      setLoading(true);
      await votacionService.registrarVoto({
        candidateId: candidatoId,
        identificationDocument: documento
      });
      setSuccess('¡Su voto ha sido registrado exitosamente!');
      setYaVoto(true);
      setCandidatos([]);
    } catch (err) {
      setError('Error al registrar el voto');
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
      {/* Botón de Admin */}
      <Box sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000
      }}>
        <Button
          component={Link}
          to="/login"
          startIcon={<AdminPanelSettings />}
          variant="outlined"
          color="primary"
          sx={{
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }
          }}
        >
          Acceso Administrativo
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Altura completa de la ventana
        pb: 10 // Padding bottom para el footer
      }}>
        <Box sx={{ 
          py: 4, // Reducido de 6 a 4
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          overflowY: 'auto' // Permite scroll en el contenido si es necesario
        }}>
          {/* Logo y Header */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4 // Reducido de 6 a 4
          }}>
            <img 
              src={logo} 
              alt="Logo Sistema de Votación"
              style={{
                width: '150px', // Reducido de 180px a 150px
                height: 'auto',
                marginBottom: '1.5rem', // Reducido de 2rem
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            />
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2
            }}>
              <HowToVote sx={{ 
                fontSize: 48, 
                color: 'primary.main',
                animation: showAnimation ? 'bounce 2s' : 'none'
              }} />
              <Typography 
                variant="h3" 
                component="h1" 
                color="primary"
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: '-0.5px'
                }}
              >
                Sistema de Votación
              </Typography>
            </Box>
          </Box>

          {/* Mensajes y Formulario */}
          <Box sx={{ 
            width: '100%',
            maxWidth: 600,
            mx: 'auto'
          }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  animation: 'slideIn 0.3s ease-out'
                }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Box sx={{ 
                textAlign: 'center',
                mb: 4,
                animation: 'slideIn 0.3s ease-out'
              }}>
                <CheckCircle sx={{ 
                  fontSize: 64,
                  color: 'success.main',
                  mb: 2
                }} />
                <Alert 
                  severity="success" 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {success}
                </Alert>
              </Box>
            )}

            {!yaVoto && !success && (
              <Card sx={{ 
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3
                  }}>
                    <PersonSearch sx={{ 
                      fontSize: 32, 
                      color: 'primary.main',
                      animation: showAnimation ? 'pulse 2s' : 'none'
                    }} />
                    <Typography variant="h5" color="primary">
                      Ingrese su documento de identidad
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex',
                    gap: 2
                  }}>
                    <TextField
                      fullWidth
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                      placeholder="Número de documento"
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.2s',
                          '&:hover': {
                            '& > fieldset': {
                              borderColor: 'primary.main',
                            }
                          }
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={verificarVoto}
                      disabled={loading || clicked || !documento}
                      className={showAnimation ? 'ripple' : ''}
                      sx={{
                        px: 4,
                        transition: 'all 0.2s',
                        '&:hover:not(:disabled)': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Verificar'
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Lista de candidatos */}
          {candidatos.length > 0 && (
            <Box sx={{ width: '100%' }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                color="primary"
                sx={{ mb: 4 }}
              >
                Seleccione su candidato
              </Typography>
              <Grid container spacing={3}>
                {candidatos.map((candidato) => (
                  <Grid item xs={12} sm={6} md={4} key={candidato.id}>
                    <Card sx={{ 
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                      }
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          color="primary"
                        >
                          {candidato.nombre}
                        </Typography>
                        <Typography 
                          color="text.secondary" 
                          sx={{ mb: 3 }}
                        >
                          {candidato.partido}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => votar(candidato.id)}
                          disabled={loading}
                          sx={{ mt: 'auto' }}
                        >
                          Votar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default VotacionPublica; 