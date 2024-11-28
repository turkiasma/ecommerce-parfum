import React from "react";
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

const { Content } = Layout;

const Home = ({ products }) => {
  const navigate = useNavigate();

  const handleDisplayAllProducts = () => {
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
      <Promotions
        products={products}
        addToBag={(id) => console.log(`Added product with ID ${id} to the bag`)}
        showDetails={false} // Ensure no extra details are shown
      />
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
