import CreditCardIcon from '@mui/icons-material/CreditCard'; // Credit Card Icon
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'; // PayPal Icon (updated)
import React, { useState } from "react";
import { useBag } from "../../context/BagContext";
import Navbar from "../UserUI/Navbar"; // Import Navbar
import Footer from "../UserUI/Footer"; // Import Footer
import Card from "../Card"; // Import the confirmation card
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
  Dialog,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Bag = () => {
  const { bag, total, updateQuantity, deleteItem, confirmBag } = useBag();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteCardOpen, setDeleteCardOpen] = useState(false); // Controls delete confirmation card
  const [itemToDelete, setItemToDelete] = useState(null); // Tracks which item to delete
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handlePaymentSelect = (event) => setSelectedPaymentMethod(event.target.value);

  // Handles the delete button click for a specific item
  const handleDeleteClick = (productId) => {
    setItemToDelete(productId); // Store the product to be deleted
    setDeleteCardOpen(true); // Open delete confirmation card
  };

  // Handles canceling the deletion
  const handleCancelDelete = () => {
    setItemToDelete(null); // Clear the item to be deleted
    setDeleteCardOpen(false); // Close delete confirmation card
  };

  // Handles confirming the deletion of the item
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete); // Call the delete function from context
      alert("Item deleted successfully!"); // Success message
    }
    handleCancelDelete(); // Reset state
  };

  const handleConfirmOrder = async () => {
    try {
      await confirmBag(selectedPaymentMethod);
      alert("Thank you for your confirmation! We are processing your order...");
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      handleDialogClose();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Bag Content */}
      <div style={{ flex: "1" }}>
        {(bag && bag.length > 0) ? (
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
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bag.map((item) => (
                  <TableRow key={item.productId._id}>
                    <TableCell>{item.productId.name}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => updateQuantity(item.productId._id, -1)}>
                          <RemoveIcon />
                        </IconButton>
                        {item.quantity}
                        <IconButton onClick={() => updateQuantity(item.productId._id, 1)}>
                          <AddIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>${item.productId.price * item.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteClick(item.productId._id)}>
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

        {(bag && bag.length) > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <Button variant="contained" color="#f8f7f1" onClick={handleDialogOpen}>
              Checkout
            </Button>
          </div>
        )}
      </div>

      {/* Image before Footer */}
      <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}>
        <img 
          src='/assets/pay.png' 
          alt="Shopping Bag" 
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginTop: "150px" }} 
        />
      </div>

      {/* Payment Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "600px", // Adjust the width of the dialog
            maxHeight: "50%", // Adjusted max height for more space
          },
        }}
      >
        <DialogTitle>Select Payment Method</DialogTitle>
        <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentSelect}>
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CurrencyExchangeIcon style={{ marginRight: "8px" }} />
                PayPal
              </div>
            }
          />
          <FormControlLabel
            value="credit card"
            control={<Radio />}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CreditCardIcon style={{ marginRight: "8px" }} />
                Credit Card
              </div>
            }
          />
        </RadioGroup>
        <Button onClick={handleConfirmOrder}>Confirm</Button>
      </Dialog>

      {/* Delete Confirmation Card */}
      {deleteCardOpen && (
        <Card 
          title="Are you sure you want to delete this item?"
          description="This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Bag;