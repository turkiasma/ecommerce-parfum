import React, { useContext, useState, useEffect } from "react";
import { Grow, Skeleton, Box } from "@mui/material";
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";
import { ProductContext } from '../../App.js';

const ListOfProducts = () => {
  const { product, loading, addToBag } = useContext(ProductContext);
  const [showCards, setShowCards] = useState(false);

  // Trigger animation after component mounts with a longer delay
  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 500); // Increase delay to 500ms
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
            ? // Render Skeletons while loading
              Array.from(new Array(8)).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 300,
                    margin: "20px",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={300}
                    height={200}
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton width="60%" height={30} style={{ marginBottom: "8px" }} />
                  <Skeleton width="80%" height={20} />
                </Box>
              ))
            : // Render Product Cards once loading is done
              product.map((perfume, index) => (
                <Grow
                  in={showCards}
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={1500 + index * 500} // Increase staggered animation delay (1500ms + 500ms for each item)
                  key={perfume._id}
                >
                  <div>
                    <CardItem
                      perfume={perfume}
                      addToBag={addToBag}
                      showDetails={false}
                    />
                  </div>
                </Grow>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListOfProducts;