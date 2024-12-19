import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import PerfumeList from '../Components/AdminUI/PerfumeList';
import AddProductForm from '../Components/AdminUI/AddProductForm';
import { getProducts, deleteProduct } from '../services/productService';

const Products = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // This tracks the product being edited or triggers add form

  // Load all products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setPerfumes(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Open form to add a new product
  const handleAdd = () => setSelectedProduct({}); // Empty object signifies "Add Product" mode

  // Open form to edit an existing product
  const handleEdit = (product) => setSelectedProduct(product); // Pass the product details to edit

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setPerfumes(perfumes.filter((perfume) => perfume._id !== id));
    } catch (error) {
      console.error(`Error deleting product with id: ${id}`, error);
    }
  };

  // Handle successful form submission for both Add and Edit modes
  const handleFormSubmit = () => {
    setSelectedProduct(null); // Reset selectedProduct to close the form
    loadProducts(); // Reload the product list
  };

  // Cancel form action and go back to the list
  const handleCancel = () => setSelectedProduct(null);

  return (
    <Box>
      {selectedProduct !== null ? (
        <AddProductForm 
          initialData={Object.keys(selectedProduct).length === 0 ? null : selectedProduct} 
          onSubmitSuccess={handleFormSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAdd} 
            style={{ marginBottom: '20px' }}
          >
            Add Product
          </Button>

          <PerfumeList
            perfumes={perfumes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddProduct={handleAdd}
          />
        </>
      )}
    </Box>
  );
};

export default Products;