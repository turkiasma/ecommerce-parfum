import axios from 'axios';

const apiUrl = 'http://localhost:9002/api/products';

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create a new product
//multipart/form-data allows you to send both text (like product name, price, etc.) and binary data (the image) in one request
export const createProduct = async (productData, image) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('scent', productData.scent);
  formData.append('description', productData.description);
  formData.append('size', productData.size);
  formData.append('promotion', productData.promotion);
  formData.append('stock', productData.stock);
  formData.append('file', image);

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
