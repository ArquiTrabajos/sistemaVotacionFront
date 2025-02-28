export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  ADMIN: {
    CANDIDATES: '/api/admin/candidates',
    VOTACIONES: '/api/admin/list-votacion',
    SOCIOS: '/api/admin/list-socios',
  },
  VOTOS: {
    VERIFICAR: '/api/votos/verificar-por-documento',
    REGISTRAR: '/api/votos/registrar',
  }
}; 