import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout Icon
import { logout } from "../../../services/userService"; // Import logout function
import Cookies from "js-cookie"; // Import Cookies for cookie management

const drawerWidth = 240;

const AdminLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate(); // To navigate after logout

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Handle logout logic
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      Cookies.remove("authToken"); // Remove auth token cookie
      navigate("/Login"); // Redirect to the login page
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Toolbar />
          <List>
            <ListItem button={true} component={Link} to="/admin">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button={true} component={Link} to="/admin/orders">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button={true} component={Link} to="/admin/products">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Admin Dashboard
              </Typography>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
              <IconButton onClick={handleLogout} color="inherit"> {/* Logout Button */}
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ p: 3, mt: 8 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
