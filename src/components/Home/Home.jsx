import React from "react";
import Header from "../Header/Header";
import Categorys from "../Categorys/Categorys";
import FeaturedProudct from "../FeaturedProudct/FeaturedProudct";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h3 className="py-5 text-center text-main">Popular Categories</h3>
        <Categorys />
        <h3 className="py-5 text-center text-main">Popular Proudcts</h3>
        <FeaturedProudct />
      </div>
    </>
  );
}
