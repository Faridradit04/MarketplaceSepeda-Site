import { bikeService } from './Sevices.jsx';

export const bikeController = {
  loadBikes: async (page = 1, limit = 1000, name = '') => {
    return await bikeService.getAllBikes(page, limit, name);
  },

  getBikeDetails: async (id) => {
    return await bikeService.getBikeById(id);
  },

  addBike: async (name, price) => {
    if (!name || !price) {
      return { success: false, error: 'Name and price are required' };
    }
    return await bikeService.createBike(name, price);
  },

  editBike: async (id, name, price) => {
    if (!name || !price) {
      return { success: false, error: 'Name and price are required' };
    }
    return await bikeService.updateBike(id, name, price);
  },

  removeBike: async (id) => {
    return await bikeService.deleteBike(id);
  }
};
