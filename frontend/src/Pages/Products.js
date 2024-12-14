import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PerfumeList from '../Components/AdminUI/PerfumeList'; // Adjust the import path if necessary
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/productService'; // Import correct functions

const Products = () => {
  const [perfumes, setPerfumes] = useState([]); // Initialize state with an empty array
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch products from the database
  useEffect(() => {
    getProducts()
      .then((response) => {
        setPerfumes(response); // Update state with fetched products
        console.log(response); // Log the response for debugging
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handles adding a new product (navigate to add product page)
  const handleAdd = () => {
    navigate('/admin/add-product'); // This will navigate to the add product page
  };

  const handleEdit = (id) => console.log(`Edit Product ${id}`);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setPerfumes(perfumes.filter((perfume) => perfume._id !== id)); // Update state to remove deleted product
      console.log(`Deleted product with id: ${id}`);
    } catch (error) {
      console.error(`Error deleting product with id: ${id}`, error);
    }
  };

  return (
    <Box>
      <PerfumeList
        perfumes={perfumes} // Pass fetched products to PerfumeList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddProduct={handleAdd} // Pass handleAdd to PerfumeList
      />
    </Box>
  );
};

export default Products;