import api from '../config/api';

export const companyService = {
  create: async (data) => {
    const response = await api.post('/companies', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/companies');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/companies/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  },
};

