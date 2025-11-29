import { useState } from "react";
import "../css/Products.css";
import { BsCart } from "react-icons/bs";
import FloatingCart from "../components/FloatingCart.jsx";

const productItems = [
  { img: "/flower1.svg", title: "Eternal Rose Bouquet", price: 159 },
  { img: "/crochet1.svg", title: "Handmade Crochet Bunny", price: 159 },
  { img: "/flower2.svg", title: "Luxury Preserved Roses", price: 299 },
  { img: "/flower1.svg", title: "Golden Rose Dome", price: 399 },
  { img: "/crochet1.svg", title: "Amigurumi Teddy Bear", price: 189 },
  { img: "/flower2.svg", title: "Forever Rose Box", price: 459 },
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Enchanted Rose Galaxy", price: 599 },
  { img: "https://i.imgur.com/3j4k5l6.jpg", title: "Premium Eternal Bloom", price: 799 },
  { img: "https://i.imgur.com/7m8n9o0.jpg", title: "Crochet Dragon", price: 249 },
  { img: "https://i.imgur.com/2p3q4r5.jpg", title: "24K Gold Dipped Rose", price: 1299 },
];

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
              <a href="/products" className="btn hero-btn-primary">
                Customize!
              </a>
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
                    <label key={i}><input type="checkbox" /> {occ}</label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-heading">Category</p>
                  {["Preserved Flowers","Crochet Gifts","Luxury Gifts","Accessories"].map((cat,i)=>(
                    <label key={i}><input type="checkbox" /> {cat}</label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-heading">Crochet Type</p>
                  {["Amigurumi","Keychains","Decor"].map((type,i)=>(
                    <label key={i}><input type="checkbox" /> {type}</label>
                  ))}
                </div>
              </div>
            </aside>

            {/* MAIN PRODUCTS */}
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
                {productItems.map((item, idx) => (
                  <div key={idx} className="product-card">
                    <div className="product-img-wrapper">
                      <img src={item.img} alt={item.title} className="product-img" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">{item.title}</h5>
                      <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                      <div className="product-bottom">
                        <p className="product-price">₱{item.price ? item.price.toFixed(2) : "159.00"}</p>
                        <button className="add-cart-btn">
                          <BsCart size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
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
