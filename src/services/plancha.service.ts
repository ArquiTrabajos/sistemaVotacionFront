import axiosInstance from './axios.config';

interface Plancha {
  id?: number;
  candidateIds: number[];
  candidatos?: any[]; // Para cuando se obtiene la plancha con sus candidatos
}

const planchaService = {
  // Crear nueva plancha
  createPlancha: async (planchaData: Plancha) => {
    try {
      const response = await axiosInstance.post('/api/admin/create-plancha', planchaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener plancha por ID
  getPlanchaById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/admin/plancha/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar plancha
  updatePlancha: async (id: number, planchaData: Plancha) => {
    try {
      const response = await axiosInstance.put(`/api/admin/plancha/${id}`, planchaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar plancha
  deletePlancha: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/plancha/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todas las planchas
  getAllPlanchas: async () => {
    try {
      const response = await axiosInstance.get('/api/admin/list-plancha');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default planchaService; 