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
        <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
          AURA was built to immerse you in a world of luxury and allure,
          offering a seamless journey to explore the finest perfumes that embody
          elegance and sophistication.
        </p>
      </div>

      {/* Video Cards */}
      <div
        style={{
          display: "flex", // Flexbox layout
          justifyContent: "space-between", 
          alignItems: "center", // Center align items vertically
          padding: "20px", 
          width: "100%", 
        }}
      >
        {/* Left Card */}
        <div 
          style={{
            width: "30%", 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            padding: "20px", 
            borderRadius: "10px", 
            fontFamily: "'Playfair Display', serif",
            color: "#333", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%", // Full width
              height: "500px", // Taller height for video
              objectFit: "cover", // Ensures content fills container without stretching
              borderRadius: "10px", 
              marginBottom: "10px"
            }}
          >
            <source src="/videos/vid6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p style={{ fontSize: "1rem", lineHeight: "1.4" }}>
            Discover the Art of Fragrance
          </p>
        </div>

        {/* Center Card */}
        <div 
          style={{
            width: "30%", 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            padding: "20px", 
            borderRadius: "10px", 
            fontFamily: "'Playfair Display', serif",
            color: "#333", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%", 
              height: "500px", // Taller height for video
              objectFit: "cover", 
              borderRadius: "10px", 
              marginBottom: "10px"
            }}
          >
            <source src="/videos/dior.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p style={{ fontSize: "1rem", lineHeight: "1.4" }}>
            Experience Elegance Like Never Before
          </p>
        </div>

        {/* Right Card */}
        <div 
          style={{
            width: "30%", 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            padding: "20px", 
            borderRadius: "10px", 
            fontFamily: "'Playfair Display', serif",
            color: "#333", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%", 
              height: "500px", // Taller height for video
              objectFit: "cover", 
              borderRadius: "10px", 
              marginBottom: "10px"
            }}
          >
            <source src="/videos/vid3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p style={{ fontSize: "1rem", lineHeight: "1.4" }}>
            Embark on a Journey of Scent
          </p>
        </div>
      </div>
    </div>
  );
};

export default  Video;

