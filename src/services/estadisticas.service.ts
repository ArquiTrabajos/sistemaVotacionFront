import { API_BASE_URL } from '../config';

const EstadisticasService = {
  getEstadisticas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resultados/estadisticas`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.mensaje);
      }
      return data.estadisticas;
    } catch (error) {
      throw error;
    }
  }
};

export default EstadisticasService; 