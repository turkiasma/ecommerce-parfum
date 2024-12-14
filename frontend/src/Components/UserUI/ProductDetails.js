import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Zoom } from "@mui/material"; // Import Zoom
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";
import "../../App.css";

const ProductDetails = ({ products, addToBag }) => {
  const { id } = useParams();
  const product = products.find((perfume) => perfume._id === Number(id));

  const [showCard, setShowCard] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 100); // Small delay for smooth animation
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <FilterAppBar />

      {/* Main Content with Animation */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <Zoom in={showCard} timeout={1000}>
          <div>
            <CardItem perfume={product} addToBag={addToBag} showDetails={true} />
          </div>
        </Zoom>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;

