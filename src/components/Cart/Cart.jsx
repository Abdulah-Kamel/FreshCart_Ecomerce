import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartCountext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import img from "../../assets/images/bag.svg";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let { getCart, updateCart, deletItem, ClearCart } = useContext(cartContext);
  async function clearUserCart() {
    let { data } = await ClearCart();
    if (data.message === "success") {
      toast.success("Cart Cleared", {
        duration: 3000,
        position: "top-right",
        className: "text-success",
      });
    } else {
      toast.error("Cart Did Not Update", {
        duration: 3000,
        position: "top-right",
        className: "text-danger",
      });
    }
    setCartDetails(data);
  }
  async function getLogeedCart() {
    let { data } = await getCart();
    setCartDetails(data);
  }
  async function getUpdatedCart(id, count) {
    let { data } = await updateCart(id, count);
    if (data.status === "success") {
      toast.success("Cart Updated", {
        duration: 3000,
        position: "top-right",
        className: "text-success",
      });
    } else {
      toast.error("Cart Did Not Update", {
        duration: 3000,
        position: "top-right",
        className: "text-danger",
      });
    }
    setCartDetails(data);
  }
  async function deleteItemCart(id) {
    let { data } = await deletItem(id);
    if (data.status === "success") {
      toast.success("Item Got Deleted", {
        duration: 3000,
        position: "top-right",
        className: "text-success",
      });
    } else {
      toast.error("Item Did Not Delete", {
        duration: 3000,
        position: "top-right",
        className: "text-danger",
      });
    }
    setCartDetails(data);
  }
  useEffect(() => {
    getLogeedCart();
  }, []);
  return (
    <div className="container my-4">
      <div className="row gy-3 justify-content-center">
        {cartDetails?.data?.totalCartPrice > 0 ? (
          <div className="info d-flex justify-content-between">
            <h5 className="fw-bolder text-main">Fresh Cart</h5>
            <h5>
              <span className="text-main fw-bolder">Total Price : </span>
              {cartDetails.data.totalCartPrice}
              <span className="ms-1">EGP</span>
            </h5>
          </div>
        ) : (
          <div className="py-6 py-lg-12">
            <div className="container">
              <div className="row">
                <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                  <img src={img} alt="" className="img-fluid" />
                  <h2>Your shopping cart is empty</h2>
                  <p className="mb-4">
                    Return to the store to add items for your delivery slot.
                    Before proceed to checkout you must add some products to
                    your shopping cart. You will find a lot of interesting
                    products on our shop page.
                  </p>
                  <Link to="/proudcts" className="btn bg-main text-white">
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {cartDetails?.data?.products
          .filter((proudct) => {
            return proudct.count > 0;
          })
          .map((proudct, index) => {
            return (
              <div className="col-lg-3" key={index}>
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
                      {proudct.product.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <div className=" my-2 box d-flex justify-content-between">
                      <span className="card-text">
                        <span>Price : </span>
                        {proudct.price}
                        <span className="ms-1">EGP</span>
                      </span>
                      <span className="card-text">Count : {proudct.count}</span>
                    </div>
                    <div className="button d-flex justify-content-between my-2">
                      <button
                        className="btn btn-outline-success w-25"
                        onClick={() => {
                          getUpdatedCart(proudct.product.id, proudct.count + 1);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger w-25"
                        onClick={() => {
                          getUpdatedCart(proudct.product.id, proudct.count - 1);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => {
                        deleteItemCart(proudct.product.id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {cartDetails?.data !== null ? (
          <div className="row py-3 g-3">
            <div className="col-md-6 Justify-Content-Center">
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  clearUserCart();
                }}
              >
                Clear Cart
              </button>
            </div>
            <div className="col-md-6 Justify-Content-Center">
              <Link className="btn btn-outline-success w-100" to={"/checkout"}>
                Continue to Checkout
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
