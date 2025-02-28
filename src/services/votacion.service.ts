import api from './api.service';

interface VotacionRequest {
  planchaId: number;
  descripcion: string;
}

interface Votacion {
  id?: number;
  descripcion: string;
  plancha: {
    id: number;
    totalCandidatos: number;
  };
}

const votacionService = {
  createVotacion: (votacionData) => 
    api.post('/api/admin/create-votacionv1', votacionData),

  getAllVotaciones: () => 
    api.get('/api/admin/list-votacion'),

  updateVotacion: (id, votacionData) => 
    api.put(`/api/admin/votacion/${id}`, votacionData),

  deleteVotacion: (id) => 
    api.delete(`/api/admin/votacion/${id}`),

  verificarVoto: (documento) => 
    api.post('/api/votos/verificar', { documento }),

  registrarVoto: async (voto: { candidateId: number; identificationDocument: string }) => {
    try {
      const response = await fetch('/api/votos/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voto),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.mensaje);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  getCandidatos: () => 
    api.get('/api/candidatos')
};

export default votacionService; 