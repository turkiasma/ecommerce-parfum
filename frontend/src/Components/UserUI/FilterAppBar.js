import React from "react";
import { AppBar, Toolbar} from "@mui/material";
import FilterDrawer from "./FilterDrawer";

const FilterAppBar = () => {
  return (
    <>
      {/* Static App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {/* Place FilterDrawer Button Inside the App Bar */}
          <FilterDrawer />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FilterAppBar;