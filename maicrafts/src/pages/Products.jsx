// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../css/Products.css";
import { BsCart } from "react-icons/bs";
import FloatingCart from "../components/FloatingCart.jsx";

const productItems = [
  {
    id: "crochet-hello-kitty",
    img: new URL("../assets/doll.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 100,
    category: "Crochet Gifts",
    occasion: ["Birthday", "Anniversary"],
  },
  {
    id: "crochet-bunny",
    img: new URL("../assets/doll2.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 120,
    category: "Crochet Gifts",
    occasion: ["Birthday"],
  },
  {
    id: "crochet-dog",
    img: new URL("../assets/doll3.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 130,
    category: "Crochet Gifts",
    occasion: ["Birthday"],
  },
  {
    id: "crochet-corpse-bride",
    img: new URL("../assets/doll4.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 150,
    category: "Crochet Gifts",
    occasion: ["Anniversary"],
  },
  {
    id: "crochet-dog-version2",
    img: new URL("../assets/doll5.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 200,
    category: "Crochet Gifts",
    occasion: ["Birthday"],
  },
  {
    id: "crochet-couple-dolls",
    img: new URL("../assets/doll6.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 300,
    category: "Crochet Gifts",
    occasion: ["Valentine's Day", "Anniversary"],
  },
  {
    id: "giant-fuzzy-rose-1",
    img: new URL("../assets/flower.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 250,
    category: "Preserved Flowers",
    occasion: ["Valentine's Day", "Mother's Day"],
  },
  {
    id: "giant-fuzzy-rose-2",
    img: new URL("../assets/flower2.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 400,
    category: "Preserved Flowers",
    occasion: ["Valentine's Day"],
  },
  {
    id: "giant-fuzzy-rose-3",
    img: new URL("../assets/flower3.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 200,
    category: "Preserved Flowers",
    occasion: ["Mother's Day"],
  },
  {
    id: "giant-fuzzy-rose-4",
    img: new URL("../assets/flower4.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 300,
    category: "Preserved Flowers",
    occasion: ["Birthday"],
  },
  {
    id: "giant-fuzzy-rose-5",
    img: new URL("../assets/flower5.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 100,
    category: "Preserved Flowers",
    occasion: ["Anniversary"],
  },
  {
    id: "giant-fuzzy-rose-6",
    img: new URL("../assets/flower6.png", import.meta.url).href,
    title: "Handmade Crochet",
    price: 140,
    category: "Preserved Flowers",
    occasion: ["Graduation"],
  },
  {
    id: "giant-fuzzy-rose-7",
    img: new URL("../assets/flower7.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 160,
    category: "Preserved Flowers",
    occasion: ["Christmas"],
  },
  {
    id: "giant-fuzzy-rose-8",
    img: new URL("../assets/flower8.png", import.meta.url).href,
    title: "Handmade Crochet",
     price: 290,
    category: "Preserved Flowers",
    occasion: ["Valentine's Day"],
  },
];

const Products = () => {
  const [sortBy, setSortBy] = useState("Popular");
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
    // New: State for cart items (moved from FloatingCart)
  const [cartItems, setCartItems] = useState([]);

  const occasions = ["Valentine's Day", "Mother's Day", "Birthday", "Anniversary", "Graduation", "Christmas"];
  const categories = ["Preserved Flowers", "Crochet Gifts", "Luxury Gifts", "Accessories"];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productItems.filter((product) => {
      const occasionMatch = selectedOccasions.length === 0 || selectedOccasions.some((occ) => product.occasion.includes(occ));
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return occasionMatch && categoryMatch;
    });

    if (sortBy === "Price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Latest") {
      // Assuming latest means by id or something; for demo, sort by id descending
      filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
    }
    // Popular is default, no sorting

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
