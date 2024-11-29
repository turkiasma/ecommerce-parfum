import React from "react";

const Video = () => {
  return (
    <div>
      {/* Description Section */}
      <div
        style={{
          textAlign: "center",
          padding: "30px 20px",
          background: "none",
          color: "#333",
          fontFamily: "'Playfair Display', serif", // Luxury font style
          marginBottom: "20px",
        }}
      >
           {/* Logo Image */}
           <img
          src="/assets/logos.png" // Replace with the correct path to your logo
          alt="Logo"
          style={{
            height: "160px", // Adjust the height of the logo
            width: "340px", // Maintain aspect ratio
          }}
        />
        <p style={{ fontSize: "1.5rem", lineHeight: "1.6"
 }}>
          AURA was built to immerse you in a world of luxury and allure,
          offering a seamless journey to explore the finest perfumes that embody
          elegance and sophistication.
        </p>
      </div>

      {/* Video Embed */}
      <div
        style={{
          display: "flex", // Flexbox layout
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          padding: "0", // Remove extra padding around the container
          width: "100%", // Full width to ensure centering
          height: "500px", // Set a fixed height for clipping
          overflow: "hidden", // Clip content that overflows
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%", // Full width
              height: "100%", // Full height
              objectFit: "cover", // Ensures content fills container without stretching
              borderRadius: "10px", // Optional: Rounded corners
            }}
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Video;

