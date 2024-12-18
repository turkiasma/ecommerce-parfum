import React, { useState, useContext } from "react";
import { Drawer, Button, Checkbox, Slider, IconButton, Snackbar, Slide } from "@mui/material";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../App.js";

const scentOptions = ["Floral", "Fruity", "Woody"];
const sizeOptions = ["50ml", "75ml", "100ml"];

const SlideTransition = (props) => <Slide {...props} direction="up" />;

const FilterDrawer = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedScent, setSelectedScent] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 500]);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    Transition: SlideTransition,
  }); // Snackbar state for slide transition
  const { product, setFilteredProducts } = useContext(ProductContext);

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const handleSnackbarOpen = (Transition) => {
    setSnackbarState({ open: true, Transition });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleValidate = () => {
    const filtered = product.filter((p) => {
      const matchesScent =
        selectedScent.length === 0 ||
        selectedScent.map((scent) => scent.toLowerCase()).includes(p.scent);

      const matchesSize =
        selectedSize.length === 0 ||
        selectedSize
          .map((size) => Number(size.slice(0, -2)))
          .includes(p.size);

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchesScent && matchesSize && matchesPrice;
    });

    if (filtered.length === 0) {
      // No matches found, reset state and show snackbar
      setSelectedScent([]);
      setSelectedSize([]);
      setPriceRange([10, 500]);
      setIsDrawerOpen(false); // Close the drawer
      handleSnackbarOpen(SlideTransition); // Show snackbar with slide transition
      return; // Stop execution to prevent navigation
    }

    // Matches found, update state and navigate
    setFilteredProducts(filtered); // Update filtered products
    setSelectedScent([]);
    setSelectedSize([]);
    setPriceRange([10, 500]);
    setIsDrawerOpen(false); // Close the drawer
    navigate('/products'); // Navigate only when matches are found
  };

  return (
    <>
      {/* Snackbar for no matches */}
      <Snackbar
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        TransitionComponent={snackbarState.Transition}
        message="No matched perfumes found. Please adjust your filters."
        key={snackbarState.Transition.name}
        autoHideDuration={1200} // Automatically hide after 1.2 seconds
      />

      {/* Button to Open Drawer */}
      <Button
        variant="outlined"
        startIcon={<FilterOutlined />}
        onClick={toggleDrawer(true)}
      >
        Filter
      </Button>

      {/* Drawer Content */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 16, position: "relative" }}>
          {/* Close Button */}
          <IconButton
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={toggleDrawer(false)}
          >
            <CloseOutlined />
          </IconButton>

          {/* Filtering Options */}
          <h4>Select Scents:</h4>
          {scentOptions.map((scent) => (
            <div key={scent}>
              <Checkbox
                checked={selectedScent.includes(scent)}
                onChange={() => {
                  setSelectedScent((prev) =>
                    prev.includes(scent)
                      ? prev.filter((s) => s !== scent)
                      : [...prev, scent]
                  );
                }}
              />
              {scent}
            </div>
          ))}

          <h4>Select Size:</h4>
          {sizeOptions.map((size) => (
            <div key={size}>
              <Checkbox
                checked={selectedSize.includes(size)}
                onChange={() => {
                  setSelectedSize((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  );
                }}
              />
              {size}
            </div>
          ))}

          <h4>Select Price:</h4>
          <Slider
            value={priceRange}
            onChange={(e, value) => setPriceRange(value)}
            valueLabelDisplay="auto"
            min={10}
            max={500}
          />

          {/* Validate Button */}
          <Button
            variant="contained"
            style={{ marginTop: 16 }}
            onClick={handleValidate}
          >
            Validate
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
