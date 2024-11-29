import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddProductForm = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    scent: '',  // Updated scent field
    description: '',
    size: '',  // Updated size field
    qte: '',
    promotion: false,
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", productData);
    navigate("/admin/products"); // Use navigate to redirect after submission
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
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
          
          {/* Scent Select */}
          <FormControl fullWidth>
            <InputLabel>Scent</InputLabel>
            <Select
              name="scent"
              value={productData.scent}
              onChange={handleChange}
              required
            >
              <MenuItem value="Woody">Woody</MenuItem>
              <MenuItem value="Floral">Floral</MenuItem>
              <MenuItem value="Fruity">Fruity</MenuItem>
            </Select>
            <FormHelperText>Select the scent of the product</FormHelperText>
          </FormControl>

          {/* Size Select */}
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              name="size"
              value={productData.size}
              onChange={handleChange}
              required
            >
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="75">75</MenuItem>
              <MenuItem value="50">50</MenuItem>
            </Select>
            <FormHelperText>Select the size of the product</FormHelperText>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            fullWidth
            value={productData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
          <TextField
            label="Stock"
            name="qte"
            type="number"
            fullWidth
            value={productData.qte}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Promotion</InputLabel>
            <Select
              name="promotion"
              value={productData.promotion}
              onChange={handleChange}
              required
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Is this product on promotion?</FormHelperText>
          </FormControl>
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            value={productData.image}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProductForm;