import { authApi, bikeApi } from './Sevices.jsx';

// Auth Service
export const authService = {
  register: async (name, email, password) => {
    try {
      const response = await authApi.register({ name, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      const { accessToken, user } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: { accessToken, user } };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return { success: false, error: 'Logout failed' };
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

export const bikeService = {
  getAllBikes: async (page = 1, limit = 10, name = '') => {
    try {
      const response = await bikeApi.getAllBikes({ page, limit, name });
      return { success: true, data: response.data.data, total: response.data.total };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to load bikes' };
    }
  },

  getBikeById: async (id) => {
    try {
      const response = await bikeApi.getBikeById(id);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to load bike' };
    }
  },

  createBike: async (name, price) => {
    try {
      const response = await bikeApi.createBike({ name, price });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create bike' };
    }
  },

  updateBike: async (id, name, price) => {
    try {
      const response = await bikeApi.updateBike(id, { name, price });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update bike' };
    }
  },

  deleteBike: async (id) => {
    try {
      const response = await bikeApi.deleteBike(id);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete bike' };
    }
  }
};

export default { authService, bikeService };
