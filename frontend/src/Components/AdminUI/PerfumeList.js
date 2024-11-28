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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PerfumeList = ({ perfumes, onEdit, onDelete, onAddProduct }) => (
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
            <TableCell align="left">Actions</TableCell>
            <TableCell align="left">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {perfumes.map((perfume) => (
            <TableRow
              key={perfume.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{perfume.name}</TableCell>
              <TableCell align="left">${perfume.price}</TableCell>
              <TableCell align="left">
                <IconButton onClick={() => onEdit(perfume.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(perfume.id)}>
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
        onClick={onAddProduct}
      >
        Add Product
      </Button>
    </Box>
  </Box>
);

export default PerfumeList;
