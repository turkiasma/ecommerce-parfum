import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Typography, Stack } from '@mui/material';
import { createProduct, updateProduct } from '../../services/productService';

const AddProductForm = ({ initialData = null, onSubmitSuccess, onCancel }) => {
  const isEditMode = Boolean(initialData && Object.keys(initialData).length > 0); // Check if we are in edit mode
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    scent: '',
    description: '',
    size: '',
    promotion: false,
    stock: '',
    image: ''
  });

  // Populate form with product data when in edit mode
  useEffect(() => {
    if (initialData) setProductData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });//optimization bochra 
  };

  const validateForm = () => {
    const requiredFields = ['name', 'price', 'stock', 'image'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        alert(`The field "${field}" is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await updateProduct(initialData._id, productData);
        alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        alert('Product created successfully!');
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error while submitting product:', error);
      alert(`Failed to submit product. Please try again.\nError: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField 
            label="Product Name" 
            name="name" 
            value={productData.name} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Price" 
            name="price" 
            type="number" 
            value={productData.price} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Scent" 
            name="scent" 
            value={productData.scent} 
            onChange={handleChange} 
          />
          <TextField 
            label="Description" 
            name="description" 
            value={productData.description} 
            onChange={handleChange} 
          />
          <TextField 
            label="Size" 
            name="size" 
            value={productData.size} 
            onChange={handleChange} 
          />
          <FormControl>
            <InputLabel>Promotion</InputLabel>
            <Select name="promotion" value={productData.promotion} onChange={handleChange}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            label="Stock" 
            name="stock" 
            type="number" 
            value={productData.stock} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Image URL" 
            name="image" 
            value={productData.imageUrl} 
            onChange={handleChange} 
            required 
          />
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProductForm;