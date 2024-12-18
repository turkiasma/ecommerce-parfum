import React,{ useContext }  from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./Navbar";
import FilterAppBar from "./FilterAppBar";
import Caroussel from "./Caroussel";
import Video from "./Video";
import Card from "./Card";
import Footer from "./Footer";
import Promotions from "./Promotions";
import '../../App.css';
import { ProductContext } from "../../App.js";

const { Content } = Layout;

const Home = () => {
  const {setFilteredProducts} = useContext(ProductContext);
  const navigate = useNavigate();

  const handleDisplayAllProducts = () => {
    setFilteredProducts([]);
    navigate("/products"); // Navigate to the /products route
  };

  return (
    <Layout>
      <Caroussel />
      <Navbar />
      <FilterAppBar />

      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#f0f2f5",
          }}
        >
          <Video />
          <Card />
        </Content>
      </Layout>

      {/* Promotions Section */}
      <Promotions/> 
      
      {/* "View All" Button */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={handleDisplayAllProducts}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          View All Products
        </button>
      </div>

      <Footer />
    </Layout>
  );
};

export default Home;
