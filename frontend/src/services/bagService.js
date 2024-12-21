import axios from "axios";

const API_BASE = "https://aura-backend-d5cv.onrender.com/api/bag";

const bagService = {
  async fetchBag() {
    try {
      const response = await axios.get(`${API_BASE}/view`, {
        withCredentials: true, // Include cookies automatically
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bag:", error);
      throw error;
    }
  },

  async addToBag(productId) {
    try {
      const response = await axios.post(
        `${API_BASE}/add`,
        { productId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to bag:", error);
      throw error;
    }
  },

  async updateQuantity(productId, quantityChange) {
    try {
      const response = await axios.post(
        `${API_BASE}/updateQuantity`,
        { productId, quantityChange },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  },

  async deleteItem(productId) {
    try {
      const response = await axios.delete(`${API_BASE}/deleteItem/${productId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  async confirmBag(paymentMethod) {
    try {
      const response = await axios.post(
        `${API_BASE}/confirmBag`,
        { paymentMethod },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error confirming bag:", error);
      throw error;
    }
  },
};

export default bagService;
