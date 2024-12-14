import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfProducts from "./Components/UserUI/ListOfProducts";
import Home from "./Components/UserUI/Home";
import ProductDetails from "./Components/UserUI/ProductDetails";
import AdminLayout from "./Components/AdminUI/Layouts/AdminLayout";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Bag from "./Components/UserUI/Bag";
import AddProductForm from "./Components/AdminUI/AddProductForm";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import axios from "axios"; // Import Axios
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Optional if Bootstrap classes are used

export const ProductContext = createContext();

const App = () => {
  const [product, setProducts] = useState([]); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [bagItems, setBagItems] = useState([]); // Bag state

  // Centralized product fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Show loading skeletons while fetching
        const response = await axios.get("http://localhost:9002/api/products"); // Replace with your backend API URL
        setProducts(response.data); // Update the product state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Always stop loading, even on error
      }
    };

    fetchProducts();
  }, []); // Run once on mount

  // Add to Bag Function
  const addToBag = (id) => {
    console.log(`Added product with ID ${id} to the bag`);

    // Find the product in the main products state
    const productToAdd = product.find((item) => item._id === id);
    if (!productToAdd) return;

    // Add logic for adding the product to the bag here
  };

  const value = {
    product,
    loading, // Pass loading state to context
    addToBag,
  };

  return (
    <div>
      <BrowserRouter>
        <ProductContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ListOfProducts />} />
            <Route path="/products/:id" element={<ProductDetails products={product} addToBag={addToBag} />} />
            <Route path="/Bag" element={<Bag initialItems={bagItems} />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="/admin/add-product" element={<AddProductForm />} />
            </Route>
          </Routes>
        </ProductContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
