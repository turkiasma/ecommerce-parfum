import React, { createContext, useState, useContext, useEffect } from "react";
import bagService from "../services/bagService";
import {jwtDecode }from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([]); // Bag state
  const [total, setTotal] = useState(0); // Total price state
  const navigate = useNavigate();

  // Helper function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = getCookie("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token to verify it’s valid
        return !!decoded;
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    }
    return false;
  };

  // Fetch the user's bag data if authenticated
  useEffect(() => {
    const fetchBagData = async () => {
      const token = getCookie("authToken");
      if (token) {
        try {
          const data = await bagService.fetchBag(); // Fetch the bag data
          setBag(data.items);
          setTotal(data.total);
        } catch (error) {
          console.error("Failed to fetch bag data:", error);
        }
      }
    };

    fetchBagData();
  }, []);

  // Function to add an item to the bag
  const addToBag = async (productId) => {
    if (!isAuthenticated()) {
      navigate(`/Login`);
      alert("Please log in to add products to the bag.");
      return;
    }

    try {
      const updatedBag = await bagService.addToBag(productId);
      setBag(updatedBag.items);
      setTotal(updatedBag.total);
    } catch (error) {
      console.error("Failed to add to bag:", error);
    }
  };

  // Other bag operations remain unchanged
  const updateQuantity = async (productId, quantityChange) => {
    try {
      const updatedBag = await bagService.updateQuantity(productId, quantityChange);
      setBag(updatedBag.items);
      setTotal(updatedBag.total);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const response = await bagService.deleteItem(productId);
      if (response.bag && response.bag.items && typeof response.bag.total === "number") {
        setBag(response.bag.items);
        setTotal(response.bag.total);
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const confirmBag = async (paymentMethod) => {
    try {
      const order = await bagService.confirmBag(paymentMethod);
      setBag([]); // Clear the bag after confirmation
      setTotal(0);
      return order;
    } catch (error) {
      console.error("Failed to confirm bag:", error);
    }
  };

  return (
    <BagContext.Provider
      value={{
        bag,
        total,
        addToBag,
        updateQuantity,
        deleteItem,
        confirmBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => useContext(BagContext);
