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
import socioService from '../services/socio.service';

interface Socio {
  id?: number;
  nombre: string;
  identificationDocument: string;
}

const Socios = () => {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSocio, setCurrentSocio] = useState<Socio>({ nombre: '', identificationDocument: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSocios = async () => {
    try {
      const data = await socioService.listSocios();
      setSocios(data);
    } catch (err) {
      setError('Error al cargar los socios');
    }
  };

  useEffect(() => {
    loadSocios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentSocio.id) {
        await socioService.updateSocio(currentSocio.id, currentSocio);
        setSuccess('Socio actualizado exitosamente');
      } else {
        await socioService.registerSocio(currentSocio);
        setSuccess('Socio registrado exitosamente');
      }
      setOpenDialog(false);
      loadSocios();
    } catch (err) {
      setError('Error al guardar el socio');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este socio?')) {
      try {
        await socioService.deleteSocio(id);
        setSuccess('Socio eliminado exitosamente');
        loadSocios();
      } catch (err) {
        setError('Error al eliminar el socio');
      }
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const data = await socioService.searchSocios(searchTerm);
        setSocios(data);
      } else {
        loadSocios();
      }
    } catch (err) {
      setError('Error en la búsqueda');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Socios
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
            setCurrentSocio({ nombre: '', identificationDocument: '' });
            setOpenDialog(true);
          }}
        >
          Nuevo Socio
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {socios.map((socio) => (
              <TableRow key={socio.id}>
                <TableCell>{socio.id}</TableCell>
                <TableCell>{socio.nombre}</TableCell>
                <TableCell>{socio.identificationDocument}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setCurrentSocio(socio);
                    setOpenDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => socio.id && handleDelete(socio.id)}>
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
          {currentSocio.id ? 'Editar Socio' : 'Nuevo Socio'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={currentSocio.nombre}
              onChange={(e) => setCurrentSocio({...currentSocio, nombre: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Documento de Identificación"
              value={currentSocio.identificationDocument}
              onChange={(e) => setCurrentSocio({...currentSocio, identificationDocument: e.target.value})}
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

export default Socios; 