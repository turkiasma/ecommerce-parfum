import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import FilterDrawer from "./FilterDrawer";

const FilterAppBar = () => {
  return (
    <>
      <AppBar 
        position="static" 
        elevation={1} 
        sx={{ backgroundColor: '#ffffff' }} 
      >
        <Toolbar>
          <FilterDrawer />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FilterAppBar;