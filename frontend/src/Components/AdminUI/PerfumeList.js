import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Tooltip, // Import Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";


// PerfumeList Component
const PerfumeList = ({ perfumes, onEdit, onDelete, onAddProduct }) => {
   
  return (
    <Box>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="perfume table">
          <TableHead>
            <TableRow>
              <TableCell>Perfume Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Stock</TableCell> {/* Stock Header */}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perfumes.map((perfume) => (
              <TableRow
                key={perfume._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{perfume.name}</TableCell>
                <TableCell align="left">${perfume.price}</TableCell>
                <TableCell align="left">
                  {/* Tooltip for Stock */}
                  <Tooltip
                    title={perfume.stock === 0 ? "Out of Stock" : `${perfume.stock} in stock`}
                    arrow
                  >
                    <span>{perfume.stock}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => onEdit(perfume._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(perfume._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Product Button */}
      <Box sx={{ marginTop: 2, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddProduct} // Use the passed function
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default PerfumeList;
