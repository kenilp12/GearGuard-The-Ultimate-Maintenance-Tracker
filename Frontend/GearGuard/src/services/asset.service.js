import api from '../config/api';

export const assetService = {
  create: async (data) => {
    const response = await api.post('/assets', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/assets');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/assets/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/assets/stats');
    return response.data;
  },
};

