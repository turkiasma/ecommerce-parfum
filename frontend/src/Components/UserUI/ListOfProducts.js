import React from "react";
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Footer from "./Footer";
import CardItem from "./CardItem";

const ListOfProducts = ({ products, addToBag }) => {
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
          {products.map((product) => (
            <CardItem
              key={product.id}
              perfume={product}
              addToBag={addToBag}
              showDetails={false}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ListOfProducts;
