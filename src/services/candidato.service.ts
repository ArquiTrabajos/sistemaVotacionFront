import { apiService } from './api.service';

export interface Candidato {
  id?: number;
  nombre: string;
  partido: string;
  descripcion?: string;
}

const candidatoService = {
  getAllCandidates: () => apiService.get('/candidatos'),
  
  getCandidateById: (id: number) => apiService.get(`/candidatos/${id}`),
  
  createCandidate: (candidato: Candidato) => apiService.post('/candidatos', candidato),
  
  updateCandidate: (id: number, candidato: Candidato) => 
    apiService.put(`/candidatos/${id}`, candidato),
  
  deleteCandidate: (id: number) => apiService.delete(`/candidatos/${id}`),

  // Buscar candidatos por nombre
  searchCandidates: async (nombre: string) => {
    try {
      const response = await apiService.get('/candidatos/search', {
        params: { nombre }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener candidatos para votación
  getCandidatosVotacion: async () => {
    try {
      const response = await apiService.get('/votos/candidatos');
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default candidatoService; 