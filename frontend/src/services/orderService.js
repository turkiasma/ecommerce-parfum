import axios from "axios";

const apiUrl = "http://localhost:9002/api/order";

// **Fetch all orders**
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/view`, {
      withCredentials: true, // Include cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// **Update order status**
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(
      `${apiUrl}/${orderId}`,
      { status },
      {
        withCredentials: true, // Include cookies automatically
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.response?.data || error.message);
    throw error;
  }
};
