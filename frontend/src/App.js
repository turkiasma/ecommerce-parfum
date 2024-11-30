import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfProducts from "./Components/UserUI/ListOfProducts";
import Home from "./Components/UserUI/Home";
import { products } from "./Components/UserUI/Data";
import ProductDetails from "./Components/UserUI/ProductDetails";
import AdminLayout from "./Components/AdminUI/Layouts/AdminLayout";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Bag from "./Components/UserUI/Bag";
import AddProductForm from "./Components/AdminUI/AddProductForm";

export const ProductContext = createContext();

const App = () => {
  const [product, setProducts] = useState(products);
  const [bagItems, setBagItems] = useState([]);

  // Add to Bag Function
  const addToBag = (id) => {
    console.log(`Added product with ID ${id} to the bag`);
    
    // Find the product in the main products state
    const productToAdd = product.find((item) => item.id === id);
    if (!productToAdd) return;

    // Increment quantity in the product state
    const updatedProducts = product.map((item) =>
      item.id === id ? { ...item, qte: item.qte + 1 } : item
    );
    setProducts(updatedProducts);

    // Check if the product is already in bagItems
    const existingItem = bagItems.find((item) => item.id === id);
    if (existingItem) {
      // Update quantity in bagItems
      const updatedBagItems = bagItems.map((item) =>
        item.id === id ? { ...item, qte: item.qte + 1 } : item
      );
      setBagItems(updatedBagItems);
    } else {
      // Add new item to bagItems
      setBagItems([...bagItems, { ...productToAdd, qte: 1 }]);
    }
  };

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
            <Route path="/" element={<Home />} />

            {/* Route for the List of Products */}
            <Route
              path="/products"
              element={<ListOfProducts />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetails products={product} addToBag={addToBag} />}
            />
           <Route path="/Bag" element={<Bag initialItems={bagItems} />} />
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


