import { Add, Delete, Edit } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
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
import candidatoService, { Candidato } from '../../services/candidato.service';

const Candidatos = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [currentCandidato, setCurrentCandidato] = useState<Candidato>({
    nombre: '',
    partido: ''
  });

  useEffect(() => {
    loadCandidatos();
  }, []);

  const loadCandidatos = async () => {
    setLoading(true);
    try {
      const data = await candidatoService.getAllCandidates();
      setCandidatos(data);
    } catch (error) {
      setError('Error al cargar los candidatos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (currentCandidato.id) {
        await candidatoService.updateCandidate(currentCandidato.id, currentCandidato);
      } else {
        await candidatoService.createCandidate(currentCandidato);
      }
      setOpen(false);
      loadCandidatos();
    } catch (error) {
      setError('Error al guardar el candidato');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gestión de Candidatos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setCurrentCandidato({ nombre: '', partido: '' });
            setOpen(true);
          }}
        >
          Nuevo Candidato
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Partido</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidatos.map((candidato) => (
                <TableRow key={candidato.id}>
                  <TableCell>{candidato.nombre}</TableCell>
                  <TableCell>{candidato.partido}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setCurrentCandidato(candidato);
                        setOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        if (candidato.id) {
                          await candidatoService.deleteCandidate(candidato.id);
                          loadCandidatos();
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {currentCandidato.id ? 'Editar Candidato' : 'Nuevo Candidato'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={currentCandidato.nombre}
            onChange={(e) => setCurrentCandidato({
              ...currentCandidato,
              nombre: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Partido"
            fullWidth
            value={currentCandidato.partido}
            onChange={(e) => setCurrentCandidato({
              ...currentCandidato,
              partido: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Candidatos; 