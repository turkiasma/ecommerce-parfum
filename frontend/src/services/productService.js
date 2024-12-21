import axios from 'axios';

const apiUrl = 'https://aura-8yfu.onrender.com/api/products';

// **Fetch all products**
export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl, {
      withCredentials: true, // Include cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// **Create a new product**
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(apiUrl, productData, {
      withCredentials: true, // Include cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error;
  }
};

// **Delete a product**
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, {
      withCredentials: true, // Include cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error;
  }
};

// **Update a product**
export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedProductData, {
      withCredentials: true, // Include cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};
