import { Assessment, Group, HowToVote, ListAlt, Refresh } from '@mui/icons-material';
import { Alert, Box, Card, CardContent, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { candidatoService, planchaService, socioService, votacionService } from '../services';

interface DashboardData {
  totalSocios: number;
  totalVotaciones: number;
  totalCandidatos: number;
  totalPlanchas: number;
}

const REFRESH_INTERVAL = 30000; // Actualizar cada 30 segundos

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>({
    totalSocios: 0,
    totalVotaciones: 0,
    totalCandidatos: 0,
    totalPlanchas: 0
  });
  const { enqueueSnackbar } = useSnackbar();
  const [animatedValue, setAnimatedValue] = useState(data.totalSocios);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.allSettled([
        socioService.listSocios(),
        votacionService.getAllVotaciones(),
        candidatoService.getAllCandidates(),
        planchaService.getAllPlanchas()
      ]);

      console.log('API Responses:', responses); // Para debugging

      const results = {
        totalSocios: responses[0].status === 'fulfilled' ? responses[0].value.length : 0,
        totalVotaciones: responses[1].status === 'fulfilled' ? responses[1].value.length : 0,
        totalCandidatos: responses[2].status === 'fulfilled' ? responses[2].value.length : 0,
        totalPlanchas: responses[3].status === 'fulfilled' ? responses[3].value.length : 0
      };

      setData(results);
    } catch (error) {
      console.error('Dashboard error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(`Error al cargar los datos: ${errorMessage}`);
      enqueueSnackbar('Error al actualizar el dashboard', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  useEffect(() => {
    let start = 0;
    const end = data.totalSocios;
    if (start === end) return;

    const duration = 2;
    const incrementTime = 1000 / 60;
    const totalIncrements = duration * 60;
    const increment = (end - start) / totalIncrements;

    const animate = () => {
      start += increment;
      setAnimatedValue(Math.floor(start));
      if (start < end) {
        setTimeout(animate, incrementTime);
      }
    };

    animate();
  }, [data.totalSocios]);

  const dashboardItems = [
    { title: 'Total Socios', value: data.totalSocios, icon: <Group sx={{ fontSize: 40 }}/>, color: '#2196F3' },
    { title: 'Votaciones', value: data.totalVotaciones, icon: <HowToVote sx={{ fontSize: 40 }}/>, color: '#4CAF50' },
    { title: 'Candidatos', value: data.totalCandidatos, icon: <Assessment sx={{ fontSize: 40 }}/>, color: '#FF9800' },
    { title: 'Planchas', value: data.totalPlanchas, icon: <ListAlt sx={{ fontSize: 40 }}/>, color: '#E91E63' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">
        Panel de Votaciones
      </Typography>
        <Tooltip title="Actualizar datos">
          <IconButton 
            onClick={loadDashboardData} 
            disabled={loading}
            color="primary"
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {loading && !data.totalSocios ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        mr: 2
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="div">
                    {animatedValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard; 