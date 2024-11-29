import React, { createContext,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import ListOfProducts from "./Components/UserUI/ListOfProducts";
import Home from "./Components/UserUI/Home"; // Import the new Home component
import { products } from "./Components/UserUI/Data";
import ProductDetails from "./Components/UserUI/ProductDetails"; // Import products
import AdminLayout from "./Components/AdminUI/Layouts/AdminLayout";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Bag from "./Components/UserUI/Bag";
import AddProductForm from "./Components/AdminUI/AddProductForm";  // Form component for adding product (create this component)


export const ProductContext = createContext();

const App = () => {
  const addToBag = (id) => {
    console.log(`Added product with ID ${id} to the bag`);
  };
  // Manage products with useState
  const [product, setProducts] = useState(products);
  const [bagItems, setBagItems] = useState([
    { name: "Perfume A", quantity: 2, price: 50 },
    { name: "Perfume B", quantity: 1, price: 30 },
  ]);
  const value = {
    product,
    addToBag,
  };

  return (
    <div>
    <BrowserRouter>
    <ProductContext.Provider value={value}>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Home products={product} />} />

        {/* Route for the List of Products */}
        <Route
          path="/products"
          element={
            <ListOfProducts
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetails products={product} addToBag={addToBag} />}
        />
        <Route path="/Bag" element={<Bag items={bagItems}/>} />
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="/admin/add-product" element={<AddProductForm />} /> {/* Route for the Add Product Form */}

      </Route>
    </Routes>
    </ProductContext.Provider>
    </BrowserRouter>
    </div>
  );
};

export default App;

