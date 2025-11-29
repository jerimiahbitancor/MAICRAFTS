// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../css/Products.css";
import { BsCart3 } from "react-icons/bs";
import FloatingCart from "../components/FloatingCart.jsx";
import { products } from "../data/productsData";

const Products = () => {
  const [sortBy, setSortBy] = useState("Popular");
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const occasions = ["Valentine's Day", "Mother's Day", "Birthday", "Anniversary", "Graduation", "Christmas"];
  const categories = ["Preserved Flowers", "Crochet Gifts", "Luxury Gifts", "Accessories"];

  const activeFilterCount = selectedOccasions.length + selectedCategories.length;

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
      {/* HERO SECTION - YOUR ORIGINAL */}
      <section className="hero-wrapper d-flex align-items-center justify-content-center">
        <div className="hero-bg-circle"></div>
        <div className="container hero-inner text-center">
          <div className="row justify-content-end align-items-center">
            <div className="col-md-6 hero-right-content text-md-end text-center">
              <p className="hero-desc lead mb-4">
                Order your Custom Gift Now!
              </p>
              <Link to="/customize" className="btn hero-btn-primary">
                Customize!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - UPGRADED TO MATCH PICTURE */}
      <section className="products-page-wrapper py-5">
        <div className="container">
          <div className="row g-5">

            {/* LEFT FILTER - NOW WITH GOLD BORDER & "Filter (0)" */}
            <aside className="col-lg-3">
              <div className="filter-sidebar-new">
                <div className="filter-header-new">
                  <h5>Filter ({activeFilterCount})</h5>
                  <button className="filter-clear-new" onClick={clearFilters}>
                    Clear
                  </button>
                </div>

                <div className="filter-section-new">
                  <p className="filter-heading-new">Occasion</p>
                  {occasions.map((occ, i) => (
                    <label key={i} className="filter-label-new">
                      <input
                        type="checkbox"
                        checked={selectedOccasions.includes(occ)}
                        onChange={() => handleOccasionChange(occ)}
                      />
                      <span>{occ}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-section-new">
                  <p className="filter-heading-new">Category</p>
                  {categories.map((cat, i) => (
                    <label key={i} className="filter-label-new">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT PRODUCTS GRID - col-lg-9 */}
            <div className="col-lg-9">
              <div className="d-flex flex-wrap align-items-center gap-3 mb-5 sort-section-new">
                <span className="text-light">Sort By:</span>
                {["Popular", "Latest", "Price"].map((option) => (
                  <button
                    key={option}
                    className={`sort-btn-new ${sortBy === option ? "active" : ""}`}
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="products-grid-new">
                {filteredAndSortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card-link-new"
                  >
                    <div className="product-card-new">
                      <div className="product-img-wrapper-new">
                        <img src={product.img} alt={product.title} className="product-img-new" />
                      </div>

                      <div className="product-info-new">
                        <h5 className="product-title-new">
                          {product.id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h5>

                        <div className="rating-new">
                          ★★★★★ <span className="reviews-new">(128)</span>
                        </div>

                        <div className="price-cart-new">
                          <p className="price-new">₱{product.price.toFixed(2)}</p>
                          <button
                            className="add-cart-btn-new"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                          >
                            <BsCart3 size={24} />
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

      <FloatingCart cartItems={cartItems} removeItem={removeItem} />
    </>
  );
};

export default Products;