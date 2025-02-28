import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import planchaService from '../services/plancha.service';
import votacionService from '../services/votacion.service';

interface Votacion {
  id?: number;
  planchaId: number;
  descripcion: string;
  plancha?: {
    id: number;
    totalCandidatos: number;
  };
}

interface Plancha {
  id: number;
  candidatos: any[];
}

const Votaciones = () => {
  const [votaciones, setVotaciones] = useState<Votacion[]>([]);
  const [planchas, setPlanchas] = useState<Plancha[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVotacion, setCurrentVotacion] = useState<Votacion>({
    planchaId: 0,
    descripcion: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadVotaciones = async () => {
    try {
      const data = await votacionService.getAllVotaciones();
      setVotaciones(data);
    } catch (err) {
      setError('Error al cargar las votaciones');
    }
  };

  const loadPlanchas = async () => {
    try {
      const data = await planchaService.getAllPlanchas();
      setPlanchas(data);
    } catch (err) {
      setError('Error al cargar las planchas');
    }
  };

  useEffect(() => {
    loadVotaciones();
    loadPlanchas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentVotacion.planchaId === 0) {
        setError('Debe seleccionar una plancha');
        return;
      }

      if (currentVotacion.id) {
        await votacionService.updateVotacion(currentVotacion.id, currentVotacion);
        setSuccess('Votación actualizada exitosamente');
      } else {
        await votacionService.createVotacion(currentVotacion);
        setSuccess('Votación creada exitosamente');
      }
      setOpenDialog(false);
      loadVotaciones();
    } catch (err) {
      setError('Error al guardar la votación');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta votación?')) {
      try {
        await votacionService.deleteVotacion(id);
        setSuccess('Votación eliminada exitosamente');
        loadVotaciones();
      } catch (err) {
        setError('Error al eliminar la votación');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Votaciones
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => {
            setCurrentVotacion({ planchaId: 0, descripcion: '' });
            setOpenDialog(true);
          }}
        >
          Nueva Votación
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Plancha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votaciones.map((votacion) => (
              <TableRow key={votacion.id}>
                <TableCell>{votacion.id}</TableCell>
                <TableCell>{votacion.descripcion}</TableCell>
                <TableCell>Plancha #{votacion.plancha?.id} ({votacion.plancha?.totalCandidatos} candidatos)</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setCurrentVotacion({
                      id: votacion.id,
                      planchaId: votacion.plancha?.id || 0,
                      descripcion: votacion.descripcion
                    });
                    setOpenDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => votacion.id && handleDelete(votacion.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentVotacion.id ? 'Editar Votación' : 'Nueva Votación'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Descripción"
              value={currentVotacion.descripcion}
              onChange={(e) => setCurrentVotacion({...currentVotacion, descripcion: e.target.value})}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Seleccionar Plancha</InputLabel>
              <Select
                value={currentVotacion.planchaId}
                onChange={(e) => setCurrentVotacion({...currentVotacion, planchaId: Number(e.target.value)})}
              >
                <MenuItem value={0}>Seleccione una plancha</MenuItem>
                {planchas.map((plancha) => (
                  <MenuItem key={plancha.id} value={plancha.id}>
                    Plancha #{plancha.id} ({plancha.candidatos.length} candidatos)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Votaciones; 