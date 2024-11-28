import React from "react";
import CardItem from "./CardItem";

const Promotions = ({ products, addToBag }) => {
  // Filter products with promotion: true
  const promotionalProducts = products.filter((product) => product.promotion);

  return (
    <div style={{ padding: "20px" }}>
      {/* Promotions Heading */}
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

      {/* Render promotional products */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {promotionalProducts.map((perfume) => (
          <CardItem
            key={perfume.id}
            perfume={perfume}
            addToBag={addToBag}
            showDetails={false} // Ensure details are not displayed
          />
        ))}
      </div>
    </div>
  );
};

export default Promotions;
