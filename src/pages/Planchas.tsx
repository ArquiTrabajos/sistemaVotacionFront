import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
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
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import candidatoService from '../services/candidato.service';
import planchaService from '../services/plancha.service';

interface Plancha {
  id?: number;
  candidateIds: number[];
  candidatos?: any[];
}

interface Candidato {
  id: number;
  nombre: string;
  partido: string;
}

const Planchas = () => {
  const [planchas, setPlanchas] = useState<Plancha[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlancha, setCurrentPlancha] = useState<Plancha>({ candidateIds: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadPlanchas = async () => {
    try {
      const data = await planchaService.getAllPlanchas();
      setPlanchas(data);
    } catch (err) {
      setError('Error al cargar las planchas');
    }
  };

  const loadCandidatos = async () => {
    try {
      const data = await candidatoService.getAllCandidates();
      setCandidatos(data);
    } catch (err) {
      setError('Error al cargar los candidatos');
    }
  };

  useEffect(() => {
    loadPlanchas();
    loadCandidatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentPlancha.id) {
        await planchaService.updatePlancha(currentPlancha.id, currentPlancha);
        setSuccess('Plancha actualizada exitosamente');
      } else {
        await planchaService.createPlancha(currentPlancha);
        setSuccess('Plancha creada exitosamente');
      }
      setOpenDialog(false);
      loadPlanchas();
    } catch (err) {
      setError('Error al guardar la plancha');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta plancha?')) {
      try {
        await planchaService.deletePlancha(id);
        setSuccess('Plancha eliminada exitosamente');
        loadPlanchas();
      } catch (err) {
        setError('Error al eliminar la plancha');
      }
    }
  };

  const handleCandidateChange = (event: SelectChangeEvent<number[]>) => {
    setCurrentPlancha({
      ...currentPlancha,
      candidateIds: event.target.value as number[]
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Planchas
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => {
            setCurrentPlancha({ candidateIds: [] });
            setOpenDialog(true);
          }}
        >
          Nueva Plancha
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Candidatos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planchas.map((plancha) => (
              <TableRow key={plancha.id}>
                <TableCell>{plancha.id}</TableCell>
                <TableCell>
                  {plancha.candidatos?.map((candidato: Candidato) => (
                    <Chip 
                      key={candidato.id}
                      label={`${candidato.nombre} - ${candidato.partido}`}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setCurrentPlancha(plancha);
                    setOpenDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => plancha.id && handleDelete(plancha.id)}>
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
          {currentPlancha.id ? 'Editar Plancha' : 'Nueva Plancha'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Seleccionar Candidatos</InputLabel>
              <Select
                multiple
                value={currentPlancha.candidateIds}
                onChange={handleCandidateChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const candidato = candidatos.find(c => c.id === value);
                      return (
                        <Chip 
                          key={value} 
                          label={candidato ? candidato.nombre : value} 
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {candidatos.map((candidato) => (
                  <MenuItem key={candidato.id} value={candidato.id}>
                    {candidato.nombre} - {candidato.partido}
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

export default Planchas; 