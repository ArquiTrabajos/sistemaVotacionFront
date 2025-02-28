import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Candidatos from '../pages/Candidatos';
import Conteo from '../pages/Conteo';
import Dashboard from '../pages/Dashboard';
import Estadisticas from '../pages/Estadisticas';
import Login from '../pages/Login';
import Planchas from '../pages/Planchas';
import Resultados from '../pages/Resultados';
import Socios from '../pages/Socios';
import Unauthorized from '../pages/Unauthorized';
import Votaciones from '../pages/Votaciones';
import VotacionPublica from '../pages/VotacionPublica';
import ProtectedRoute from './ProtectedRoute';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas para ROLE_ADMIN */}
      <Route path="/panel" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/estadisticas" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Estadisticas />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/conteo" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Conteo />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/resultados" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Resultados />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/candidatos" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Candidatos />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/planchas" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Planchas />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/socios" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Socios />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/votaciones" element={
        <ProtectedRoute roles={['ROLE_ADMIN']}>
          <Layout>
            <Votaciones />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/votar" element={<VotacionPublica />} />
      
      <Route path="/" element={<Navigate to="/votar" replace />} />
    </Routes>
  );
};

export default AppRoutes; 