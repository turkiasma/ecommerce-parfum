import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Caroussel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>Flash Sales - Up to 70% Off!</h3>
        </div>
        <div>
          <h3>Exclusive Deals - Limited Time Only!</h3>
        </div>
        <div>
          <h3>Buy One, Get One Free - Selected Scents!</h3>
        </div>
        <div>
          <h3>Holiday Sale - Save Big on Luxury Perfumes!</h3>
        </div>
        <div>
          <h3>New Arrivals - Launch Promo: 20% Off!</h3>
        </div>
        <div>
          <h3>Last Chance for These Deals!</h3>
        </div>
      </Slider>
    </div>
  );
}

export default Caroussel;