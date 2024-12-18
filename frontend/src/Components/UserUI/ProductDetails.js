import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Zoom, Skeleton, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";
import { ProductContext } from "../../App.js";
import { useBag } from "../../context/BagContext";  // Import useBag for Bag context
import "../../App.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading } = useContext(ProductContext); // Fetch product-related data
  const { addToBag } = useBag(); // Fetch addToBag from BagContext

  const productDetails = product.find((perfume) => perfume._id === id);

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <FilterAppBar />
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: 300, margin: "20px" }}>
            <Skeleton
              variant="rectangular"
              width={300}
              height={200}
              style={{ marginBottom: "8px" }}
            />
            <Skeleton width="60%" height={30} style={{ marginBottom: "8px" }} />
            <Skeleton width="80%" height={20} />
          </Box>
        </div>
        <Footer />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div>
        <Navbar />
        <FilterAppBar />
        <Typography variant="h6" style={{ textAlign: "center", padding: "20px" }}>
          Product not found.
        </Typography>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <FilterAppBar />

      <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <Zoom in={showCard} timeout={1000}>
          <div>
            <CardItem perfume={productDetails} addToBag={addToBag} showDetails={true} />
          </div>
        </Zoom>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;