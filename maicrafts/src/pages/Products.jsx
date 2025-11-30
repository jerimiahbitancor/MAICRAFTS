// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../css/Products.css";
import FloatingCart from "../components/FloatingCart.jsx";
import { products } from "../data/productsData";

const Products = () => {
  const [sortBy, setSortBy] = useState("Popular");
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const occasions = ["Valentine's Day", "Mother's Day", "Birthday", "Anniversary", "Graduation", "Christmas"];
  const categories = ["Preserved Flowers", "Crochet Gifts", "Luxury Gifts", "Accessories"];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const occasionMatch =
        selectedOccasions.length === 0 ||
        selectedOccasions.some((occ) => product.occasion.includes(occ));
  
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
  
      return occasionMatch && categoryMatch;
    });
  
    if (sortBy === "Price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Latest") {
      filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
    }
  
    return filtered;
  }, [selectedOccasions, selectedCategories, sortBy]);

  const handleOccasionChange = (occasion) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedOccasions([]);
    setSelectedCategories([]);
  };

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-wrapper">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
          src="/products.mp4"
        />
        <div className="hero-bg-circle"></div>
        <div className="container hero-inner">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-8 text-center">
              <h1 className="hero-title">Our Collection</h1>
              <p className="hero-desc">
                Discover handcrafted gifts perfect for every occasion
              </p>
              <Link to="/customize" className="btn hero-btn-primary">
                Create Custom Gift
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-page-wrapper">
        <div className="container">
          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-toggle d-lg-none mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fas fa-filter me-2"></i>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="row">
            {/* FILTER SIDEBAR */}
            <aside className={`col-lg-3 mb-4 filter-column ${showFilters ? 'show' : ''}`}>
              <div className="filter-sidebar">
                <div className="filter-header">
                  <h5 className="filter-title">Filters</h5>
                  <button 
                    className="filter-close d-lg-none"
                    onClick={() => setShowFilters(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                {(selectedOccasions.length > 0 || selectedCategories.length > 0) && (
                  <button className="filter-clear" onClick={clearFilters}>
                    <i className="fas fa-times-circle me-2"></i>
                    Clear All Filters
                  </button>
                )}

                <div className="filter-section">
                  <p className="filter-heading">
                    <i className="fas fa-calendar-star me-2"></i>
                    Occasion
                  </p>
                  {occasions.map((occ, i) => (
                    <label key={i} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedOccasions.includes(occ)}
                        onChange={() => handleOccasionChange(occ)}
                      />
                      <span className="filter-label">{occ}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-heading">
                    <i className="fas fa-tag me-2"></i>
                    Category
                  </p>
                  {categories.map((cat, i) => (
                    <label key={i} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <span className="filter-label">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* MAIN PRODUCTS GRID */}
            <div className="col-lg-9">
              {/* Sort & Results Count */}
              <div className="products-header">
                <div className="results-count">
                  <span>{filteredAndSortedProducts.length}</span> Products Found
                </div>
                <div className="sort-controls">
                  <span className="sort-label">Sort By:</span>
                  <div className="sort-buttons">
                    {["Popular", "Latest", "Price"].map((option) => (
                      <button
                        key={option}
                        className={`sort-btn ${sortBy === option ? "active" : ""}`}
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredAndSortedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="product-card-link"
                    >
                      <div className="product-card">
                        <div className="product-img-wrapper">
                          <img 
                            src={product.img} 
                            alt={product.title} 
                            className="product-img" 
                            loading="lazy"
                          />
                          <div className="product-badge">New</div>
                        </div>
                        
                        <div className="product-info-container">
                          <div className="product-details">
                            <h5 className="product-id">
                              {product.id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </h5>
                            <div className="product-rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                          <div className="product-bottom">
                            <p className="product-price">₱{product.price.toFixed(2)}</p>
                            <span className="view-details">View Details →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-products">
                  <i className="fas fa-box-open"></i>
                  <h3>No Products Found</h3>
                  <p>Try adjusting your filters to see more results</p>
                  <button className="btn hero-btn-primary" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FloatingCart cartItems={cartItems} removeItem={removeItem} />
    </>
  );
};

export default Products;