import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Bag = ({ initialItems }) => { // Destructure initialItems
  const [items, setItems] = useState(initialItems || []); // Ensure it's initialized as an array

  // Function to handle quantity increment
  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].qte += 1;
    setItems(updatedItems);
  };

  // Function to handle quantity decrement
  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].qte > 1) {
      updatedItems[index].qte -= 1;
      setItems(updatedItems);
    }
  };

  // Function to handle item deletion
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Function to handle cancel button
  const handleCancel = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qte, 0); // Fix quantity here

  return (
    <div>
      {items.length > 0 ? (
        <TableContainer component={Paper}>
          <Typography variant="h6" sx={{ padding: "16px" }}>
            Your Shopping Bag
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleDecreaseQuantity(index)}>
                        <RemoveIcon />
                      </IconButton>
                      {item.qte}
                      <IconButton onClick={() => handleIncreaseQuantity(index)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>${(item.price * item.qte).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="subtitle1">Total</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" sx={{ padding: "16px" }}>
          Your Bag is currently empty
        </Typography>
      )}
      {items.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{ marginRight: "8px" }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};
export default Bag;
