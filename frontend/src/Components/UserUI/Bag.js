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
  Dialog,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Bag = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems || []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Handle dialog open/close
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Handle payment selection
  const handlePaymentSelect = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].qte += 1;
    setItems(updatedItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].qte > 1) {
      updatedItems[index].qte -= 1;
      setItems(updatedItems);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCancel = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qte, 0);

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
                <TableCell>Remove</TableCell>
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
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            Checkout
          </Button>
        </div>
      )}

      {/* Payment Method Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Payment Method</DialogTitle>
        <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentSelect}>
          <ListItem>
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AccountBalanceWalletIcon style={{ marginRight: 8 }} />
                  <ListItemText primary="PayPal" />
                </div>
              }
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              value="CreditCard"
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CreditCardIcon style={{ marginRight: 8 }} />
                  <ListItemText primary="Credit or Debit Card" />
                </div>
              }
            />
          </ListItem>
        </RadioGroup>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "16px" }}>
          <Button onClick={handleDialogClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDialogClose();
            }}
            color="primary"
            variant="contained"
            style={{ marginLeft: "8px" }}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Bag;
