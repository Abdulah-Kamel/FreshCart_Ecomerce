import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartCountext";
import { InfinitySpin } from "react-loader-spinner";

export default function Brands() {
  let [brands, setBrands] = useState(null);
  let { getBrands } = useContext(cartContext);
  async function Brands() {
    let { data } = await getBrands();
    setBrands(data.data);
  }
  useEffect(() => {
    Brands();
  }, []);
  return (
    <>
      {brands !== null ? (
        <div className="container py-5">
          <div className="header d-flex justify-content-center">
            <h1 className="text-main">Our Brands</h1>
          </div>
          <div className="row">
            {brands.map((brand,index) => {
              return (
                <div className="col-md-3" key={index}>
                  <img src={brand.image} alt="" className="w-100"/>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="vh-100  d-flex justify-content-center align-items-center">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
    </>
  );
}
