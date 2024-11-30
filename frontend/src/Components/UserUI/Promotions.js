import React, { useContext } from "react";
import CardItem from "./CardItem";
import { ProductContext } from "../../App";

const Promotions = () => {
  const { product, addToBag } = useContext(ProductContext);
  const promotionalProducts = product.filter((p) => p.promotion);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px", fontFamily: "'Playfair Display', serif" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Our Promotions</h2>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Discover our exclusive deals on the finest fragrances.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {promotionalProducts.map((perfume) => (
          <CardItem
            key={perfume.id}
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

