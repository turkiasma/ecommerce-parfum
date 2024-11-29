import React, { useState } from "react";
import { Box } from "@mui/material";
import PerfumeList from "../Components/AdminUI/PerfumeList"; // Adjust the import path
import { dummyPerfumes } from "../Utils/DummyData"; // Adjust the import path
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Products = () => {
  const [perfumes, setPerfumes] = useState(dummyPerfumes);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handles adding a new product (navigate to add product page)
  const handleAdd = () => {
    navigate("/admin/add-product"); // This will navigate to the add product page
  };

  const handleEdit = (id) => console.log(`Edit Product ${id}`);

  const handleDelete = (id) => {
    console.log(`Delete Product ${id}`);
    setPerfumes(perfumes.filter((perfume) => perfume.id !== id));
  };

  return (
    <Box>
      <PerfumeList
        perfumes={perfumes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddProduct={handleAdd} // Pass handleAdd to PerfumeList
      />
    </Box>
  );
};

export default Products;
