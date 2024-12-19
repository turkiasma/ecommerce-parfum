import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfProducts from "./Components/UserUI/ListOfProducts";
import Home from "./Components/UserUI/Home";
import ProductDetails from "./Components/UserUI/ProductDetails";
import AdminLayout from "./Components/AdminUI/Layouts/AdminLayout";
import AdminDashboard from "./Components/AdminUI/AdminDashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Bag from "./Components/UserUI/Bag";
import AddProductForm from "./Components/AdminUI/AddProductForm";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import { BagProvider } from "./context/BagContext";
import { getProducts } from "./services/productService"; // Importing the getProducts function
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductContext = createContext();

const App = () => {
  const [product, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    product,
    loading,
    filteredProducts,
    setFilteredProducts,
  };

  return (
    <div>
      <BrowserRouter>
        <ProductContext.Provider value={value}>
          <BagProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ListOfProducts />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Login" element={<Login />} />

              {/* Protected Route: Bag (Only accessible to authenticated users with role 'user') */}
              <Route
                path="/Bag"
                element={
                  <PrivateRoute allowedRoles={['user']}>
                    <Bag />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes: Accessible only to 'admin' role */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="products" element={<Products />} />
                <Route path="add-product" element={<AddProductForm />} />
              </Route>
            </Routes>
          </BagProvider>
        </ProductContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;


