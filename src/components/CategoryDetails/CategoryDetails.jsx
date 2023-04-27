import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartCountext";
import toast from "react-hot-toast";

export default function CategoryDetails() {
  let { id } = useParams();
  let [proudcts,setProudcts]=useState(null)
  let { getProudcts, addToCart, setNumberOfCart } = useContext(cartContext);
  async function Proudcts() {
    let {data} = await getProudcts();
    setProudcts(data.data)
  }
   async function addProudct(id) {
     let { data } = await addToCart(id);
     if (data?.status === "success") {
       setNumberOfCart(data.numOfCartItems);
       toast.success(data.message, {
         duration: 3000,
         position: "top-right",
         className: "text-success",
       });
     } else {
       toast.error(data.message, {
         duration: 3000,
         position: "top-right",
         className: "text-danger",
       });
     }
   }
  useEffect(() => {
    Proudcts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-main">Our Proudcts : </h2>
      <div className="row gy-4 py-5">
        {proudcts !== null ? (
          proudcts.filter((proudct) => {
            return proudct.category._id === id;
          }).map((product, index) => {
            return (
              <div className="col-md-3" key={index}>
                <div className="card ">
                  <Link to={`/proudcts/${product.id}`} className="nav-link">
                    <img
                      src={product.imageCover}
                      className="card-img-top"
                      alt="..."
                    />
                  </Link>
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
                    <button
                      className="btn bg-main w-100 text-white"
                      onClick={() => {
                        addProudct(product._id);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="vh-100  d-flex justify-content-center align-items-center">
            <InfinitySpin width="200" color="#4fa94d" />
          </div>
        )}
    </div>
    </div>
  );
}
