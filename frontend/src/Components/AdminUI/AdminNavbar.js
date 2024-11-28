import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminNavbar = () => (
  <Box sx={{ display: "flex", gap: 2, padding: 2, background: "#f5f5f5" }}>
    <Button component={Link} to="/products">
      Products
    </Button>
    <Button component={Link} to="/orders">
      Orders
    </Button>
  </Box>
);

export default AdminNavbar;
