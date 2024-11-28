import React, { useState } from "react";
import { Box } from "@mui/material";
import PerfumeList from "../Components/AdminUI/PerfumeList";
import { dummyPerfumes } from "../utils/dummyData";

const Products = () => {
  const [perfumes, setPerfumes] = useState(dummyPerfumes);

  // Handles adding a new product (console log for now)
  const handleAdd = () => console.log("Add Product");

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
