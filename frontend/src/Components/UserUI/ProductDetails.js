import React from "react";
import { useParams } from "react-router-dom";
import CardItem from "./CardItem";

const ProductDetails = ({ products, addToBag }) => {
  const { id } = useParams();
  const product = products.find((perfume) => perfume.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <CardItem perfume={product} addToBag={addToBag} showDetails={true} />
    </div>
  );
};

export default ProductDetails;
