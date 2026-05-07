import { authService } from './Sevices.jsx';

export const authController = {
  handleLogin: async (email, password) => {
    const result = await authService.login(email, password);
    if (!result.success) {
      return { success: false, error: result.error };
    }
    return result;
  },

  handleRegister: async (name, email, password) => {
    const result = await authService.register(name, email, password);
    if (!result.success) {
      return { success: false, error: result.error };
    }
    return result;
  },

  handleLogout: async () => {
    return await authService.logout();
  },

  getUser: () => {
    return authService.getCurrentUser();
  },

  isLoggedIn: () => {
    return authService.isAuthenticated();
  }
};
