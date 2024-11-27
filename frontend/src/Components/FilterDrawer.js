import React, { useState } from "react";
import { Drawer, Button, Checkbox, Slider, IconButton } from "@mui/material";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";

const scentOptions = ["Floral", "Fruity", "Woody"];
const sizeOptions = ["50ml", "75ml", "100ml"];

const FilterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedScent, setSelectedScent] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [priceRange, setPriceRange] = useState([50, 200]);

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const handleValidate = () => {
    console.log("Selected Scent:", selectedScent);
    console.log("Selected Size:", selectedSize);
    console.log("Price Range:", priceRange);
    setSelectedScent([]);
    setSelectedSize([]);
    setPriceRange([50, 200]);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterOutlined />}
        onClick={toggleDrawer(true)}
      >
        Filter
      </Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 16, position: "relative" }}>
          {/* Close button */}
          <IconButton
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={toggleDrawer(false)}
          >
            <CloseOutlined />
          </IconButton>

          {/* Drawer content */}
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
