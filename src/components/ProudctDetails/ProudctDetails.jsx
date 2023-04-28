import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartCountext";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

export default function ProudctDetails() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  let { addToCart } = useContext(cartContext);
  async function addProudct(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message, {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.error(data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  }
  const [product, setProduct] = useState(null);
  let { id } = useParams();
  let ProudctId;
  async function getDetails(ProudctId) {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${ProudctId}`
    );
    setProduct(data.data);
  }
  useEffect(() => {
    ProudctId = id;
    getDetails(ProudctId);
  }, []);
  return (
    <div className="container my-5 py-5">
      {product !== null ? (
        <div className="row align-items-center gy-5">
          <div className="col-md-4">
            <div className="px-3">
              <Slider {...settings}>
                {product.images?.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image} alt="" className="w-100" />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="col-md-8">
            <div className="proudct-info">
              <p>{product.title}</p>
              <p className="text-muted">{product.description}</p>
            </div>
            <div className=" my-2 box d-flex justify-content-between">
              <span className="card-text">
                {product.price}
                <span className="text-danger ms-1">EGP</span>
              </span>
              <span className="card-text">
                {product.ratingsAverage}
                <i className="ms-1 rating-color fa-solid fa-star"></i>
              </span>
            </div>
            <div className="quntity">
              <p className="text-main">
                Quntity :{" "}
                <span className="text-danger">{product.quantity}</span>
              </p>
            </div>
            <button
              className="btn bg-main my-2 text-white w-100"
              onClick={() => {
                addProudct(product._id);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
    </div>
  );
}
