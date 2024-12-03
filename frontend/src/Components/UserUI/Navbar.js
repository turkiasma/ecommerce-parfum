import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  UserOutlined, // Profile icon
  ShoppingOutlined, // Bag icon
  SearchOutlined, // Search icon
} from "@ant-design/icons";

const Navbar = () => {
  // Define menu items with icons
  const items1 = [
    {
      key: "1",
      icon: <SearchOutlined style={{ fontSize: "24px", color: "black" }} />,
      label: null,
    },
    {
      key: "2",
      icon: (
        <Link to="/Bag">
          <ShoppingOutlined style={{ fontSize: "24px", color: "black" }} />
        </Link>
      ),
      label: null,
    },

    {
      key: "3",
      icon: (
        <Link to="/Login">
          <UserOutlined style={{ fontSize: "24px", color: "black" }} />
        </Link>
      ),
      label: null,
    }


  ];

  return (
    <div className="navbar flex items-center justify-between px-4 bg-white border-b border-black sticky top-0 z-10">
      {/* Logo replaced with text */}
      <div
        className="logo"
        style={{
          textAlign: "center",
          padding: "30px 20px",
          fontFamily: "'Playfair Display', serif",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            AURA
          </h2>
        </Link>
      </div>

      {/* Icons on the right */}
      <Menu
        mode="horizontal"
        items={items1}
        className="bg-white border-none flex justify-end"
      />
    </div>
  );
};

export default Navbar;
