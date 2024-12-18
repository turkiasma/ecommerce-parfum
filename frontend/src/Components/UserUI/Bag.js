import React, { useState } from "react";
import { useBag } from "../../context/BagContext";
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handlePaymentSelect = (event) => setSelectedPaymentMethod(event.target.value);

  const handleConfirmOrder = async () => {
    try {
      await confirmBag(selectedPaymentMethod);
      alert("Order confirmed!");
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      handleDialogClose();
    }
  };

  return (
    <div>
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
                    <IconButton onClick={() => deleteItem(item.productId._id)}>
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
      { (bag && bag.length )> 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            Checkout
          </Button>
        </div>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentSelect}>
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="credit card" control={<Radio />} label="Credit Card" />
        </RadioGroup>
        <Button onClick={handleConfirmOrder}>Confirm</Button>
      </Dialog>
    </div>
  );
};

export default Bag;