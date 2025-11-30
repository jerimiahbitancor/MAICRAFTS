// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../css/Products.css";
import { BsCart } from "react-icons/bs";
import FloatingCart from "../components/FloatingCart.jsx";
import { products } from "../data/productsData";

const Products = () => {
  const [sortBy, setSortBy] = useState("Popular");
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // New: State for cart items (moved from FloatingCart)
  const [cartItems, setCartItems] = useState([]);
  // New: State to control the customize modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="hero-wrapper d-flex align-items-center justify-content-center">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="bg-video"
    src="/products.mp4"
  />

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

    {/* PRODUCTS SECTION */}
    <section className="products-page-wrapper py-5">
      <div className="container">
        <div className="row">
          {/* FILTER SIDEBAR */}
          <aside className="col-lg-3 mb-4">
            <div className="filter-sidebar p-3">
              <h5 className="filter-title">Filters</h5>
              <button className="filter-clear mb-3" onClick={clearFilters}>
                Clear All
              </button>

              <div className="filter-section">
                <p className="filter-heading">Occasion</p>
                {occasions.map((occ, i) => (
                  <label key={i} className="d-block">
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={selectedOccasions.includes(occ)}
                      onChange={() => handleOccasionChange(occ)}
                    />{" "}
                    {occ}
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <p className="filter-heading">Category</p>
                {categories.map((cat, i) => (
                  <label key={i} className="d-block">
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />{" "}
                    {cat}
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
              {filteredAndSortedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card-link"
                >
                  <div className="product-card">
                    {/* IMAGE */}
                    <div className="product-img-wrapper">
                      <img src={product.img} alt={product.title} className="product-img" />
                    </div>
                    
                    <div className="product-info-container">
                      <div className="product-name-price">
                        <h5 className="product-id">
                          {product.id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h5>
                      </div>
                      <div className="product-bottom">
                        <p className="product-price">₱{product.price.toFixed(2)}</p>
                        <button
                          className="add-cart-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                        >
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
    <FloatingCart cartItems={cartItems} removeItem={removeItem} />
  </>
);
};

export default Products;
