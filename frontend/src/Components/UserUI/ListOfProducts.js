import React, { useContext, useState, useEffect } from "react";
import { Grow } from "@mui/material"; // Import Grow from Material-UI
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";
import { ProductContext } from '../../App.js';

const ListOfProducts = () => {
  const { product, addToBag } = useContext(ProductContext);

  const [showCards, setShowCards] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 100); // Delay to start the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Filter AppBar */}
      <FilterAppBar />

      {/* Main Product Listing */}
      <div style={{ padding: "24px", background: "#f5f5f5" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {product.map((product, index) => (
            <Grow
              in={showCards}
              style={{ transformOrigin: "0 0 0" }}
              timeout={1000 + index * 300} // Slower animation: base 1000ms + stagger 300ms
              key={product.id}
            >
              <div>
                <CardItem
                  perfume={product}
                  addToBag={addToBag}
                  showDetails={false}
                />
              </div>
            </Grow>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ListOfProducts;
