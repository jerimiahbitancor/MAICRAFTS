// maicrafts/src/pages/Home.jsx
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";
import { products } from "../data/productsData.js";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, products.length - visibleCount) : Math.max(0, prev - visibleCount)
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + visibleCount;
      return nextIndex >= products.length ? 0 : nextIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index * visibleCount);
  };

  // Calculate number of dots/pages
  const pages = Math.ceil(products.length / visibleCount);

  // Get visible products
  const visibleProducts = products.slice(currentIndex, currentIndex + visibleCount);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
          src="/counter1.mp4"
        />

        <div className="circular-gradient-bg"></div>
        <div className="container hero-content py-5">
          <div className="row justify-content-center">
            <div className="header-section col-lg-10 col-xl-8">
              <h1 className="featured-title display-4 fw-bold mb-4 lh-1">
                Your Vision
                <br />
                <span className="text-accent">Artfully Made</span>
              </h1>
              <p className="featured-desc lead mb-5 fs-5 col-12 col-md-10 col-lg-8 mx-auto opacity-90">
                Let us help you create a gift as unique as your love
              </p>
              <div className="cta-container">
                <a href="#products" className="btn-primary-custom">
                  Explore Products
                </a>
                <a href="/about" className="btn-outline-custom">
                  Learn Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="featured-prod py-5 py-md-7">
        <div className="container">
          <div className="section-title mb-5 mb-md-6">
            <h2 className="prod-title display-1 text-center m-0">
              Featured Products
            </h2>
          </div>

          <div className="carousel-container position-relative">
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-card">
                    <div className="img-wrapper">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="transition-scale"
                        loading="lazy"
                      />
                      <div className="img-overlay"></div>
                    </div>
                    <div className="product-details">
                      <h5 className="product-title">{product.title}</h5>
                      <p className="product-price">₱{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <button 
              className="carousel-btn prev" 
              onClick={prevSlide}
              aria-label="Previous products"
            ></button>
            <button 
              className="carousel-btn next" 
              onClick={nextSlide}
              aria-label="Next products"
            ></button>

            {/* Dots Indicator */}
            <div className="text-center mt-4">
              {Array.from({ length: pages }).map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    Math.floor(currentIndex / visibleCount) === index ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  role="button"
                  aria-label={`Go to page ${index + 1}`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;