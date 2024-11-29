import React, { useState } from "react";
import { Box } from "@mui/material";

import OrderList from "../Components/AdminUI/OrderList";
import { dummyOrders } from "../Utils/DummyData";

const Orders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const handleUpdateStatus = (id, status) => {
    console.log(`Update order ${id} to ${status}`);
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <Box>
      <OrderList orders={orders} onUpdateStatus={handleUpdateStatus} />
    </Box>
  );
};

export default Orders;
