import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Candidatos from '../pages/admin/Candidatos';
import Planchas from '../pages/admin/Planchas';
import Resultados from '../pages/admin/Resultados';
import Socios from '../pages/admin/Socios';
import Votaciones from '../pages/admin/Votaciones';

const AdminRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidatos" element={<Candidatos />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/planchas" element={<Planchas />} />
        <Route path="/votaciones" element={<Votaciones />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </Layout>
  );
};

export default AdminRoutes; 