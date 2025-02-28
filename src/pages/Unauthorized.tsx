import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2
      }}
    >
      <Typography variant="h4">
        Acceso No Autorizado
      </Typography>
      <Typography>
        No tienes permisos para acceder a esta página.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
    </Box>
  );
};

export default Unauthorized; 