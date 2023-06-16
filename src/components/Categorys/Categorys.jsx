import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Categorys() {
  const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 4000,
      cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
    const [allCategores, setCat] = useState(null);
  async function getCategorys() {
    let { data } = await axios.get(
      "https://route-ecommerce-app.vercel.app/api/v1/categories"
    );
    setCat(data.data);
  }
  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <div className="container p-3">
      {allCategores === null ? (
        <div className="d-flex justify-content-center">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <Slider {...settings}>
          {allCategores.map((categ, index) => {
            return (
              <div className="col-md-3" key={index}>
                <Link to={`/category/${categ._id}`}>
                  <img
                    src={categ.image}
                    alt={categ.name}
                    className="w-100"
                    height={300}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
