import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

export default function CategoryView() {
  let [category, setCategory] = useState(null);
  let { id } = useParams();
  async function getCategory() {
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories/"
    );
    setCategory(data.data);
  }
  useEffect(() => {
    getCategory(id);
  }, [id]);
  return (
    <div className="container py-5">
      <h2 className="fw-bolder text-center">Categorys</h2>
      <div className="row g-5 py-5">

      {category !== null ? (
        category.map((categ,index) => {
          return (
            <div className="col-md-4" key={index}>
                <Link to={`${categ._id}`} className="nav-link">
                <h3 className="text-main text-center">{categ.name}</h3>
                <img
                  src={categ.image}
                  alt={categ.name}
                  className="w-100 h-100"
                />
            </Link>
              </div>
          );
        })
        ) : (
          <div className="d-flex justify-content-center py-5">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
      </div>
    </div>
  );
}
