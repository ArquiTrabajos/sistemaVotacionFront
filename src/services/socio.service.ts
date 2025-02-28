import axiosInstance from './axios.config';

interface Socio {
  id?: number;
  nombre: string;
  identificationDocument: string;
}

const socioService = {
  // Registrar nuevo socio
  registerSocio: async (socioData: Socio) => {
    try {
      const response = await axiosInstance.post('/api/admin/register-socio', socioData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener lista de socios
  listSocios: async () => {
    try {
      const response = await axiosInstance.get('/api/admin/list-socios');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener socio por ID
  getSocioById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/admin/socio/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar socio
  updateSocio: async (id: number, socioData: Socio) => {
    try {
      const response = await axiosInstance.put(`/api/admin/socio/${id}`, socioData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar socio
  deleteSocio: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/socio/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar socios por nombre
  searchSocios: async (nombre: string) => {
    try {
      const response = await axiosInstance.get(`/api/admin/socios/search`, {
        params: { nombre }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default socioService; 