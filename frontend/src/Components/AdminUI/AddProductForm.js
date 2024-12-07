import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    scent: '',
    description: '',
    size: '',
    promotion: false,
    stock: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const response = await axios.post('http://localhost:9002/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created:', response.data);
      alert(`Product created successfully!`);
      navigate('/admin/products'); // Redirect after success
    } catch (error) {
      console.error('Error while adding product:', error);
      alert(`Failed to create product. Please try again.\nError: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={3}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            value={productData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={productData.price}
            onChange={handleChange}
            required
          />
          <TextField
            label="Scent"
            name="scent"
            fullWidth
            value={productData.scent}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={productData.description}
            onChange={handleChange}
          />
          <TextField
            label="Size"
            name="size"
            fullWidth
            value={productData.size}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel id="promotion-label">Promotion</InputLabel>
            <Select
              labelId="promotion-label"
              name="promotion"
              value={productData.promotion}
              onChange={handleChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Select promotion status</FormHelperText>
          </FormControl>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            value={productData.stock}
            onChange={handleChange}
          />

          {/* Updated Image Upload */}
          <Typography variant="body1">Upload Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProductForm;
