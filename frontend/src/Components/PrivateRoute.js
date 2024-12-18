import React from "react";
import { Navigate } from "react-router-dom";
import { UserRole } from "../services/userRole";

function PrivateRoute({ children, allowedRoles }) {
  const role = UserRole(); // Retrieve user role from the token
  console.log("User Role:", role);

  // Check if the user is authenticated and has the required role
  if (role) {
    return allowedRoles.includes(role) ? children : <Navigate to="/" />; // Redirect unauthorized users to home
  } else {
    return <Navigate to="/Login" />; // Redirect unauthenticated users to login
  }
}

export default PrivateRoute;
