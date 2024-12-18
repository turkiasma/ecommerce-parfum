import React, { useContext, useState, useEffect } from "react";
import { Grow, Skeleton, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";
import { ProductContext } from '../../App.js';
import { useBag } from "../../context/BagContext"; // Import useBag for Bag context

const ListOfProducts = () => {
  const { product, filteredProducts, loading } = useContext(ProductContext); // Only fetch product-related data from ProductContext
  const { addToBag } = useBag(); // Fetch addToBag from BagContext
  const [showCards, setShowCards] = useState(false);

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : product;

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <FilterAppBar />
      <div style={{ padding: "24px", background: "#f5f5f5" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <Box key={index} sx={{ width: 300, margin: "20px" }}>
                  <Skeleton variant="rectangular" width={300} height={200} style={{ marginBottom: "8px" }} />
                  <Skeleton width="60%" height={30} style={{ marginBottom: "8px" }} />
                  <Skeleton width="80%" height={20} />
                </Box>
              ))
            : productsToDisplay.length > 0 ? (
                productsToDisplay.map((perfume, index) => (
                  <Grow
                    in={showCards}
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={1500 + index * 500}
                    key={perfume._id}
                  >
                    <div>
                      <CardItem perfume={perfume} addToBag={addToBag} showDetails={false} />
                    </div>
                  </Grow>
                ))
              ) : (
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  No products available.
                </Typography>
              )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListOfProducts;
