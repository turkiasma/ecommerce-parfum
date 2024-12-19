import React from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { useBag } from "../../context/BagContext"; // Import BagContext
import { logout } from "../../services/userService"; // Import the logout function
import {
  UserOutlined, // Profile icon
  ShoppingOutlined, // Bag icon
  LogoutOutlined, // Logout icon
} from "@ant-design/icons";
import "../../Styles/Navbar.css";

const Navbar = () => {
  const { bag } = useBag(); // Access the bag state
  const navigate = useNavigate(); // To navigate after logout

  // Calculate the total number of items in the bag
  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);

  // Handle logout logic
  const handleLogout = async () => {
    try {
      await logout();// Call the logout function
      Cookies.remove('authToken') ;
      navigate("/Login"); // Redirect to the login page
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="navbar flex items-center justify-between px-4 bg-white border-b border-black sticky top-0 z-10">
      {/* Logo */}
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

      {/* Custom Menu with icons on the left and right */}
      <div className="custom-menu flex justify-between w-full">
        {/* Bag icon on the left */}
        <div className="menu-item">
          <Link to="/Bag" className="menu-link" style={{ position: "relative" }}>
            <ShoppingOutlined style={{ fontSize: "24px", color: "black" }} />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* User icon in the middle */}
        <div className="menu-item">
          <Link to="/Login" className="menu-link">
            <UserOutlined style={{ fontSize: "24px", color: "black" }} />
          </Link>
        </div>

        {/* Logout icon on the right */}
        <div className="menu-item ml-auto">
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "black",
            }}
          >
            <LogoutOutlined style={{ fontSize: "24px", color: "black" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
