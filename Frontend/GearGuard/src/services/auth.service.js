import api from '../config/api';

export const authService = {
  signup: async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

