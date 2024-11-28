import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "orange",
      color: "white",
    };
  } else if (status === "Rejected") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

const OrderList = ({ orders, onUpdateStatus }) => (
  <TableContainer
    component={Paper}
    style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="order table">
      <TableHead>
        <TableRow>
          <TableCell>Buyer ID</TableCell>
          <TableCell align="left">Total</TableCell>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{order.buyerId}</TableCell>
            <TableCell align="left">${order.total}</TableCell>
            <TableCell align="left">
              <span style={makeStyle(order.status)}>{order.status}</span>
            </TableCell>
            <TableCell align="left">
              <Button
                onClick={() => onUpdateStatus(order.id, "Approved")}
                style={{ marginRight: "10px" }}
              >
                Approve
              </Button>
              <Button onClick={() => onUpdateStatus(order.id, "Rejected")}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default OrderList;
