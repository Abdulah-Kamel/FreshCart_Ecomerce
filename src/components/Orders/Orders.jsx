import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartCountext";
import { InfinitySpin } from "react-loader-spinner";
import jwtDecode from "jwt-decode";

export default function Orders() {
  let [orders, setOrders] = useState(null);
  let { getOrders } = useContext(cartContext);
  let token = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(token);
  async function getAllOrders() {
    let data = await getOrders();
    setOrders(data.data.data);
  }
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <div className="container py-5">
          <h2 className="text-main">Order Details</h2>
          <div className="bg-light p-5">
        <div className="row py-2 gy-3">
            {orders !== null ? (
              orders
                ?.filter((order) => {
                  return order.user._id === decodedToken.id;
                })
                .map((proudct) => {
                  return (
                    <>
                      <h3 className="pb-5">
                        <span>Total Order Price : </span>
                        <span className="text-main">
                          {proudct.totalOrderPrice}
                        </span>
                      </h3>
                      {proudct?.cartItems?.map((proudct, index) => {
                        return (
                          <div className="col-md-3" key={index}>
                            <Link
                              to={`/proudcts/${proudct._id}`}
                              className="nav-link"
                            >
                              <div className="card ">
                                <img
                                  src={proudct.product.imageCover}
                                  className="card-img-top"
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="text-main">
                                    {proudct.product.category.name}
                                  </h5>
                                  <h6 className="card-title">
                                    {proudct.product.title
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ")}
                                  </h6>
                                  <div className=" my-2 box d-flex justify-content-between ">
                                    <span className="card-text">
                                      {proudct.price}
                                      <span className="ms-1">EGP</span>
                                    </span>
                                    <span className="card-text">
                                      {proudct.product.ratingsAverage}
                                      <i className="ms-1 rating-color fa-solid fa-star"></i>
                                    </span>
                                  </div>
                                  <p>
                                    <span className="text-main">Count : </span>
                                    <span>{proudct.count}</span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                      <div className="details d-flex justify-content-between pt-3 border border-2 border-end-0 border-start-0 border-top-0">
                        <p>
                          <span className="h5 text-main">Is Paid : </span>
                          <span>{proudct.isPaid === true ? "yes" : "No"}</span>
                        </p>
                        <p>
                          <span className="h5 text-main">Is Delivered : </span>
                          <span>
                            {proudct.isDelivered === true ? "yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </>
                  );
                })
            ) : (
              <div className="vh-100 d-flex justify-content-center align-items-center">
                <InfinitySpin width="200" color="#4fa94d" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
