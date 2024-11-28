import React from "react";
import { Menu } from "antd";
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
      icon: <SearchOutlined style={{ fontSize: "24px", color: "black" }} />, // Increase icon size
      label: null, // No label, icon only
    },
    {
      key: "2",
      icon: <ShoppingOutlined style={{ fontSize: "24px", color: "black" }} />, // Increase icon size
      label: null, // No label, icon only
    },
    {
      key: "3",
      icon: <UserOutlined style={{ fontSize: "24px", color: "black" }} />, // Increase icon size
      label: null, // No label, icon only
    },
  ];

  return (
    <div className="navbar">
      {" "}
      {/* Apply the sticky navbar class here */}
      <Menu
        mode="horizontal"
        items={items1}
        className="static bg-white border-b border-black flex justify-end py-3"
      />
    </div>
  );
};

export default Navbar;
