import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import OrderList from "../Components/AdminUI/OrderList";
import { getAllOrders, updateOrderStatus } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Store fetched orders

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        const formattedOrders = data.map((order) => ({
          id: order._id,
          buyerId: order.customerId.userName,
          total: order.total,
          status: order.status,
        }));
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle status update
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <Box>
      <OrderList orders={orders} onUpdateStatus={handleUpdateStatus} />
    </Box>
  );
};

export default Orders;
