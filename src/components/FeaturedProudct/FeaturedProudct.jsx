import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import style from "./FeaturedProudct.module.scss";
export default function FeaturedProudct() {
  const [allProducts, setProducts] = useState(null);
  async function getProudcts() {
    let { data } = await axios.get(
      "https://route-ecommerce-app.vercel.app/api/v1/products"
    );
    setProducts(data.data);
  }
  useEffect(() => {
    getProudcts();
  }, []);
  return (
    <div className="row gy-4">
      {allProducts !== null ? (
        allProducts
          .filter((proudct) => {
            return proudct.ratingsAverage > 4;
          })
          .slice(0, 12)
          .map((product, index) => {
            return (
              <div className="col-md-3 position-relative" key={index}>
                <Link to={`/proudcts/${product.id}`} className="nav-link">
                  <div className="card">
                    <img
                      src={product.imageCover}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="text-main">{product.category.name}</h5>
                      <h6 className="card-title">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                      <div className=" my-2 box d-flex justify-content-between">
                        <span className="card-text">
                          {product.price}
                          <span className="ms-1">EGP</span>
                        </span>
                        <span className="card-text">
                          {product.ratingsAverage}
                          <i className="ms-1 rating-color fa-solid fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
      ) : (
        <InfinitySpin width="200" color="#4fa94d" />
      )}
    </div>
  );
}
