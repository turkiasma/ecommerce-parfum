import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <div>
      {/* Description Section */}
      <div
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontStyle: "italic",
          fontFamily: "'Playfair Display', serif", // Luxury font style
          marginBottom: "30px",
          marginTop: "40px",
          color: "#555",
        }}
      >
        Discover our scents and experience the essence of sophistication.
      </div>

      <StyledWrapper>
        <div className="cardContainer">
          {/* Floral Card */}
          <div className="myCard">
            <div className="innerCard">
              <div className="frontSide image1">
                <p className="title">FLORAL</p>
              </div>
              <div className="backSide">
                <p className="title">FLORAL</p>
                <p>A delicate and romantic blend of blooming flowers.</p>
              </div>
            </div>
          </div>

          {/* Woody Card */}
          <div className="myCard">
            <div className="innerCard">
              <div className="frontSide image2">
                <p className="title">WOODY</p>
              </div>
              <div className="backSide">
                <p className="title">WOODY</p>
                <p>Earthy and warm tones inspired by nature's forests.</p>
              </div>
            </div>
          </div>

          {/* Fruity Card */}
          <div className="myCard">
            <div className="innerCard">
              <div className="frontSide image3">
                <p className="title">FRUITY</p>
              </div>
              <div className="backSide">
                <p className="title">FRUITY</p>
                <p>Fresh and vibrant bursts of sweet, juicy fruits.</p>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

  .cardContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
   
    border-radius: 1rem; /* Optional rounded corners */
  }



  .myCard {
    background-color: transparent;
    width: 230px;
    height: 300px;
    perspective: 1000px;
  }

  .innerCard {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    cursor: pointer;
  
  }

  .myCard:hover .innerCard {
    transform: rotateY(180deg);
  }

  .frontSide,
  .backSide {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 1rem;
    color: white;
    box-shadow: 0 0 0.3em rgba(255, 255, 255, 0.5);
    font-weight: 700;
    font-family: "Playfair Display", serif;
  }

  .frontSide {
    background-size: cover;
    background-position: center;
  }

  .backSide {
    background-color: white; /* Changed to white */
    color: black; /* Changed to black */
    transform: rotateY(180deg);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* Images from the public/assets folder */
  .image1 {
    background-image: url("/assets/warda.jpg");
  }

  .image2 {
    background-image: url("/assets/bois.jpg");
  }

  .image3 {
    background-image: url("/assets/fruita.jpg");
  }
`;

export default Card;
