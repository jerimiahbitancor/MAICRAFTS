// src/pages/Products.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../css/Products.css";
import { BsCart } from "react-icons/bs";
import FloatingCart from "../components/FloatingCart.jsx";
import { products } from "../data/productsData";

const Products = () => {
  const [sortBy, setSortBy] = useState("Popular");

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-wrapper d-flex align-items-center justify-content-center">
        <div className="hero-bg-circle"></div>
        <div className="container hero-inner text-center">
          <div className="row justify-content-end align-items-center">
            <div className="col-md-6 hero-right-content text-md-end text-center">
              <p className="hero-desc lead mb-4">
                Order your Custom Gift Now!
              </p>
              <Link to="/products" className="btn hero-btn-primary">
                Customize!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-page-wrapper py-5">
        <div className="container">
          <div className="row">
            {/* FILTER SIDEBAR */}
            <aside className="col-lg-3 mb-4">
              <div className="filter-sidebar p-3">
                <h5 className="filter-title">Filters</h5>
                <button className="filter-clear mb-3">Clear All</button>

                <div className="filter-section">
                  <p className="filter-heading">Occasion</p>
                  {["Valentine's Day","Mother's Day","Birthday","Anniversary","Graduation","Christmas"].map((occ,i)=>(
                    <label key={i} className="d-block">
                      <input type="checkbox" className="me-2" /> {occ}
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-heading">Category</p>
                  {["Preserved Flowers","Crochet Gifts","Luxury Gifts","Accessories"].map((cat,i)=>(
                    <label key={i} className="d-block">
                      <input type="checkbox" className="me-2" /> {cat}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* MAIN PRODUCTS GRID */}
            <div className="col-lg-9">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <span className="text-light me-2">Sort By:</span>
                {["Popular", "Latest", "Price"].map((option) => (
                  <button
                    key={option}
                    className={`btn sort-btn ${sortBy === option ? "active" : ""}`}
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="products-grid">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card-link" // for styling hover
                  >
                    <div className="product-card">
                      <div className="product-img-wrapper">
                        <img src={product.img} alt={product.title} className="product-img" />
                      </div>
                      <div className="product-info">
                        <h5 className="product-title">{product.title}</h5>
                        <div className="product-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="star">★</span>
                          ))}
                        </div>
                        <div className="product-bottom">
                          <p className="product-price">₱{product.price.toFixed(2)}</p>
                          <button className="add-cart-btn" onClick={(e) => e.preventDefault()}>
                            <BsCart size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
            <FloatingCart />
    </>
  );
};

export default Products;