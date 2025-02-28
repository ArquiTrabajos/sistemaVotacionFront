import { Alert, Box, Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EstadisticasService from '../services/estadisticas.service';

interface CandidatoEstadistica {
  porcentaje: number;
  partido: string;
  candidatoId: number;
  nombre: string;
  totalVotos: number;
}

interface PlanchaEstadistica {
  planchaId: number;
  totalVotos: number;
  porcentaje: number;
}

interface EstadisticasData {
  votosPorPlancha: { [key: string]: PlanchaEstadistica };
  votosPorCandidato: { [key: string]: CandidatoEstadistica };
  totalVotos: number;
  totalCandidatos: number;
  totalPlanchas: number;
  fechaActualizacion: string;
}

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        const data = await EstadisticasService.getEstadisticas();
        setEstadisticas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchEstadisticas, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress />
    </Box>
  );
  
  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  if (!estadisticas) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Estadísticas de Votación
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Votos</Typography>
              <Typography variant="h3">{estadisticas.totalVotos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Candidatos</Typography>
              <Typography variant="h3">{estadisticas.totalCandidatos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Planchas</Typography>
              <Typography variant="h3">{estadisticas.totalPlanchas}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Votos por Plancha</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plancha ID</TableCell>
                <TableCell>Total Votos</TableCell>
                <TableCell>Porcentaje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(estadisticas.votosPorPlancha).map((plancha) => (
                <TableRow key={plancha.planchaId}>
                  <TableCell>Plancha #{plancha.planchaId}</TableCell>
                  <TableCell>{plancha.totalVotos}</TableCell>
                  <TableCell>{plancha.porcentaje.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Votos por Candidato</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Partido</TableCell>
                <TableCell>Total Votos</TableCell>
                <TableCell>Porcentaje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(estadisticas.votosPorCandidato).map((candidato) => (
                <TableRow key={candidato.candidatoId}>
                  <TableCell>{candidato.nombre}</TableCell>
                  <TableCell>{candidato.partido}</TableCell>
                  <TableCell>{candidato.totalVotos}</TableCell>
                  <TableCell>{candidato.porcentaje.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'right' }}>
        Última actualización: {estadisticas.fechaActualizacion}
      </Typography>
    </Box>
  );
};

export default Estadisticas; 