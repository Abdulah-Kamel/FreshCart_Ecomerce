import React from "react";
import amzonpay from "../../assets/images/Amazon_Pay_logo.svg";
import americanexpress from "../../assets/images/american-express.svg";
import MasterCardLogo from "../../assets/images/MasterCard_Logo.svg";
import paypal from "../../assets/images/paypal-seeklogo.com.svg";
import store from "../../assets/images/Google Play Store Apple App Store Icons.png";

export default function Footer() {
  return (
    <div className="bg-light">
      <div className="container py-4">
        <p className="h3">Get The FreshCart app</p>
        <p className="text-muted">
          We will send you alink, open it n your phone to download the app
        </p>
        <div className="input row g-2">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Email"
            />
          </div>
          <div className="col-lg-6 text-lg-start text-center">
            <button className="btn bg-main text-white">Share App Link</button>
          </div>
        </div>
        <div className="row align-items-center my-3 border border-end-0 border-start-0">
          <div className="col-md-6">
            <div className="row align-items-center g-3">
              <div className="col-4 text-md-start text-center">
                <h5>Payment Partners</h5>
              </div>
              <div className="col-2">
                <img src={amzonpay} alt="" className="w-100" />
              </div>
              <div className="col-2">
                <img src={americanexpress} alt="" className="w-100" />
              </div>
              <div className="col-2">
                <img src={MasterCardLogo} alt="" className="w-100" />
              </div>
              <div className="col-2">
                <img src={paypal} alt="" className="w-100" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row align-items-center g-3 py-3">
              <div className="col-6 text-md-start text-center">
                <h5>Get deliveries with FreshCart</h5>
              </div>
              <div className="col-6">
                <img src={store} alt="" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
