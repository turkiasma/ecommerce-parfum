import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import ListOfProducts from "./Components/UserUI/ListOfProducts";
import Home from "./Components/UserUI/Home"; // Import the new Home component
import { products } from "./Components/UserUI/Data";
import ProductDetails from "./Components/UserUI/ProductDetails"; // Import products

const App = () => {
  const addToBag = (id) => {
    console.log(`Added product with ID ${id} to the bag`);
  };
  // Manage products with useState
  const [product, setProducts] = useState(products);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Home products={product} />} />

        {/* Route for the List of Products */}
        <Route
          path="/products"
          element={
            <ListOfProducts
              products={product} // Pass products state
              addToBag={(id) => console.log(`Added product with ID ${id} to the bag`)}
              showDetails={(id) => console.log(`Show details for product with ID ${id}`)}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetails products={product} addToBag={addToBag} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

