import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from '../../Context/CartCountext';

export default function Navbar({ userData, logOut }) {
  let { numberOfCart } = useContext(cartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" className="w-75" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="proudcts">
                    Proudcts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="category">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    <i className="fa-solid fa-cart-shopping ms-1"></i>
                    <span className="badge bg-main text-white">
                      {numberOfCart}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link to={"/"} className="text-decoration-none text-dark">
                  <i className="fab mx-2 fa-facebook"></i>
                </Link>
                <Link to={"/"} className="text-decoration-none text-dark">
                  <i className="fab mx-2 fa-instagram"></i>
                </Link>
                <Link to={"/"} className="text-decoration-none text-dark">
                  <i className="fab mx-2 fa-twitter"></i>
                </Link>
                <Link to={"/"} className="text-decoration-none text-dark">
                  <i className="fab mx-2 fa-tiktok"></i>
                </Link>
                <Link to={"/"} className="text-decoration-none text-dark">
                  <i className="fab mx-2 fa-linkedin"></i>
                </Link>
              </li>
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" onClick={logOut}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
