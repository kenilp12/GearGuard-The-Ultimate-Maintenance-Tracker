import api from '../config/api';

export const maintenanceService = {
  createRequest: async (data) => {
    const response = await api.post('/maintenance', data);
    return response.data;
  },

  getRequests: async () => {
    const response = await api.get('/maintenance');
    return response.data;
  },

  updateRequestStatus: async (id, status) => {
    const response = await api.patch(`/maintenance/${id}/status`, { status });
    return response.data;
  },
};

