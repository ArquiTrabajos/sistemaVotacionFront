import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
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
import candidatoService from '../services/candidato.service';

interface Candidato {
  id?: number;
  nombre: string;
  partido: string;
}

const Candidatos = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCandidato, setCurrentCandidato] = useState<Candidato>({ nombre: '', partido: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCandidatos = async () => {
    try {
      const data = await candidatoService.getAllCandidates();
      setCandidatos(data);
    } catch (err) {
      setError('Error al cargar los candidatos');
    }
  };

  useEffect(() => {
    loadCandidatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentCandidato.id) {
        await candidatoService.updateCandidate(currentCandidato.id, currentCandidato);
        setSuccess('Candidato actualizado exitosamente');
      } else {
        await candidatoService.createCandidate(currentCandidato);
        setSuccess('Candidato registrado exitosamente');
      }
      setOpenDialog(false);
      loadCandidatos();
    } catch (err) {
      setError('Error al guardar el candidato');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este candidato?')) {
      try {
        await candidatoService.deleteCandidate(id);
        setSuccess('Candidato eliminado exitosamente');
        loadCandidatos();
      } catch (err) {
        setError('Error al eliminar el candidato');
      }
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const data = await candidatoService.searchCandidates(searchTerm);
        setCandidatos(data);
      } else {
        loadCandidatos();
      }
    } catch (err) {
      setError('Error en la búsqueda');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Candidatos
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          variant="contained" 
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Buscar
        </Button>
        <Button 
          variant="contained" 
          onClick={() => {
            setCurrentCandidato({ nombre: '', partido: '' });
            setOpenDialog(true);
          }}
        >
          Nuevo Candidato
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Partido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatos.map((candidato) => (
              <TableRow key={candidato.id}>
                <TableCell>{candidato.id}</TableCell>
                <TableCell>{candidato.nombre}</TableCell>
                <TableCell>{candidato.partido}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setCurrentCandidato(candidato);
                    setOpenDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => candidato.id && handleDelete(candidato.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentCandidato.id ? 'Editar Candidato' : 'Nuevo Candidato'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={currentCandidato.nombre}
              onChange={(e) => setCurrentCandidato({...currentCandidato, nombre: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Partido"
              value={currentCandidato.partido}
              onChange={(e) => setCurrentCandidato({...currentCandidato, partido: e.target.value})}
              margin="normal"
            />
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

export default Candidatos; 