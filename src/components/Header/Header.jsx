import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function Header() {
  let images = [img1, img2, img3];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  return (
    <div className="container">
        <Slider {...settings}>
          {images.map((image, index) => {
            return (
              <div className="col" key={index}>
                <img src={image} alt="" className="w-100 vh-100" />
              </div>
            );
          })}
        </Slider>
    </div>
  );
}
