import api from '../config/api';

export const workOrderService = {
  create: async (data) => {
    const response = await api.post('/work-orders', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/work-orders');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/work-orders/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/work-orders/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/work-orders/${id}`);
    return response.data;
  },
};

