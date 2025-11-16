import React from "react";
import "../css/Home.css";

const Home = () => {
  return (
    <div>
      <section className="bg-pattern">
        <div className="overlay absolute inset-0"></div>

        <h1 className="featured-title">Featured Products</h1>

        <div className="product-grid flex gap-8">
          <div className="product-card">Product 1</div>
          <div className="product-card">Product 2</div>
          <div className="product-card">Product 3</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
