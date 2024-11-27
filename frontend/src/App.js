import React from "react";
import { Layout } from "antd";
import Navbar from "./Components/Navbar";
import FilterAppBar from "./Components/FilterAppBar";
import Caroussel from "./Components/Caroussel";
import Video from "./Components/Video"; // Import your Card component
import Card from "./Components/Card"; // Import your Card component
import Footer from "./Components/Footer"; // Adjust the path as necessary
import "./App.css";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Caroussel />
      <Navbar />
      <FilterAppBar/>

      <Layout>
        {/* Content Area */}
       
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#f0f2f5",
            }}
          >
            <Video />
            {/* Render the rotating cards below the video */}
            <Card />
          </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default App;
