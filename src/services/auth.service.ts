import { API_BASE_URL } from '../config';

interface LoginResponse {
  mensaje: string;
  success: boolean;
  token: string;
  user: {
    email: string;
    username: string;
    role: string;
  };
}

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      
      // Guardar el token y datos del usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('username', data.user.username);
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    window.location.href = '/login';
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getRole: (): string | null => {
    return localStorage.getItem('role');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};

export default authService; 