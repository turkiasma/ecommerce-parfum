import React, { useContext } from "react";
import { Skeleton, Box } from "@mui/material";
import CardItem from "./CardItem";
import { ProductContext } from "../../App";

const Promotions = () => {
  const { product, loading, addToBag } = useContext(ProductContext);
  const promotionalProducts = product.filter((p) => p.promotion);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Our Promotions</h2>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Discover our exclusive deals on the finest fragrances.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Box key={index} sx={{ width: 300, margin: "20px" }}>
                <Skeleton variant="rectangular" width={300} height={200} style={{ marginBottom: "8px" }} />
                <Skeleton width="60%" height={30} style={{ marginBottom: "8px" }} />
                <Skeleton width="80%" height={20} />
              </Box>
            ))
          : promotionalProducts.map((perfume) => (
              <CardItem
                key={perfume._id}
                perfume={perfume}
                addToBag={addToBag}
                showDetails={false}
              />
            ))}
      </div>
    </div>
  );
};

export default Promotions;
