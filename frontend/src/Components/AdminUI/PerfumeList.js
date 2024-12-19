import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Tooltip,
  Snackbar, // Snackbar for success message
  Alert // Alert to display success message
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '../Card';

const PerfumeList = ({ perfumes, onEdit, onDelete }) => {
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedPerfumeId(id); // Store the ID of the product to be deleted
    setShowDeleteCard(true); // Show the confirmation card
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(selectedPerfumeId); // Call the delete function with the selected ID
      setShowDeleteCard(false); // Close the confirmation card
      setSnackbarOpen(true); // Show success message
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteCard(false); // Close the confirmation card
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the success message
  };

  return (
    <Box>
      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="perfume table">
          <TableHead>
            <TableRow>
              <TableCell>Perfume Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perfumes.map((perfume) => (
              <TableRow key={perfume._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{perfume.name}</TableCell>
                <TableCell align="left">${perfume.price}</TableCell>
                <TableCell align="left">
                  <Tooltip title={perfume.stock === 0 ? "Out of Stock" : `${perfume.stock} in stock`} arrow>
                    <span>{perfume.stock}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => onEdit(perfume)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(perfume._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showDeleteCard && (
        <Card
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PerfumeList;
