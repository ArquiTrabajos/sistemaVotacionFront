import {
  Assessment as AssessmentIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  HowToVote as HowToVoteIcon,
  ListAlt as ListAltIcon,
  Logout as LogoutIcon,
  Poll as PollIcon
} from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoVotacion from '../../assets/LogoVotacion.webp.webp';
import AdminFooter from './AdminFooter';
import Navbar from './Navbar';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/panel' },
  { text: 'Candidatos', icon: <AssessmentIcon />, path: '/panel/candidatos' },
  { text: 'Socios', icon: <GroupIcon />, path: '/panel/socios' },
  { text: 'Planchas', icon: <ListAltIcon />, path: '/panel/planchas' },
  { text: 'Votaciones', icon: <HowToVoteIcon />, path: '/panel/votaciones' },
  { text: 'Resultados', icon: <PollIcon />, path: '/panel/resultados' }
];

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    navigate('/login');
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={LogoVotacion} alt="Logo" style={{ height: '40px' }} />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh'
    }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
      >
        {drawer}
      </Box>

      {/* Contenido principal */}
      <Main>
        <Box component="div" sx={{ 
          mt: 8, // Espacio para el navbar
          mb: 10, // Espacio para el footer
          p: 3,
          width: '100%'
        }}>
          {children}
        </Box>
        <AdminFooter />
      </Main>
    </Box>
  );
};

export default Layout; 