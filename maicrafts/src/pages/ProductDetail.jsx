// src/pages/ProductDetail.jsx
import { useState } from "react";
import "../css/ProductDetail.css";
import { BsCart3 } from "react-icons/bs";

const relatedProducts = [
  { img: "/flower1.svg", title: "Eternal Rose Bouquet", price: 159 },
  { img: "/crochet1.svg", title: "Handmade Crochet Bunny", price: 159 },
  { img: "/flower2.svg", title: "Luxury Preserved Roses", price: 299 },
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Enchanted Rose Galaxy", price: 599 },
];

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState("Pink Rose");
  const [flowerQty, setFlowerQty] = useState("9 Flowers");
  const [size, setSize] = useState("Medium");
  const [addOns, setAddOns] = useState("None");
  const [quantity, setQuantity] = useState(1);

  const colors = ["Pink Rose", "Red", "Yellow", "Brown", "Blue", "Green", "Violet", "Lover"];
  const flowerOptions = ["3 Flowers", "5 Flowers", "7 Flowers", "9 Flowers", "12 Flowers"];
  const sizes = ["Small", "Medium", "Large", "Extra Large"];
  const addOnOptions = [
    "None",
    "Greeting Card (+₱50)",
    "Chocolate Box (+₱250)",
    "Teddy Bear (+₱350)",
    "LED Lights (+₱150)",
  ];

  const basePrice = 799.0;
  const addOnPrice = addOns.includes("(+)")
    ? parseInt(addOns.match(/₱(\d+)/)?.[1] || 0)
    : 0;
  const totalPrice = (basePrice + addOnPrice) * quantity;

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/products">Products</a></li>
            <li className="breadcrumb-item active">Rainbow Rose Bouquet</li>
          </ol>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="product-detail-section py-5" style={{ background: "#2d1b0b" }}>
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Product Image */}
            <div className="col-lg-6">
              <div className="product-image-wrapper">
                <img
                  src="https://i.imgur.com/9g0h1i2.jpg"
                  alt="Rainbow Rose Bouquet"
                  className="img-fluid rounded shadow-lg product-main-img"
                />
              </div>
            </div>

            {/* Product Info & Options */}
            <div className="col-lg-6">
              <h1 className="product-title">Rainbow Rose Bouquet</h1>
              <h2 className="product-price">₱{totalPrice.toFixed(2)}</h2>

              {/* Color Variations */}
              <div className="mb-4">
                <p className="option-label">Variations</p>
                <div className="color-swatches">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`color-swatch ${selectedColor === color ? "active" : ""}`}
                      style={{ backgroundColor: getColorCode(color) }}
                      aria-label={color}
                    >
                      {selectedColor === color && <span>Checkmark</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flower Quantity & Size */}
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="option-label">Quantity of Flower</label>
                  <select
                    className="form-select custom-select"
                    value={flowerQty}
                    onChange={(e) => setFlowerQty(e.target.value)}
                  >
                    {flowerOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="option-label">Size</label>
                  <select
                    className="form-select custom-select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-4">
                <label className="option-label">Select your add ons</label>
                <select
                  className="form-select custom-select"
                  value={addOns}
                  onChange={(e) => setAddOns(e.target.value)}
                >
                  {addOnOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Quantity + Total + Buttons */}
              <div className="purchase-section">
                <div className="quantity-box">
                  <span>Quantity</span>
                  <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <p className="total-price-label">
                  Total: <strong>₱{totalPrice.toFixed(2)}</strong>
                </p>

                <div className="action-buttons mt-4">
                  <button className="btn-add-to-cart">
                    <BsCart3 className="me-2" />
                    Add to Cart
                  </button>
                  <button className="btn-buy-now">Buy Now</button>
                </div>
              </div>

              <div className="policy-links mt-4">
                <a href="#">Payment Policy</a> • <a href="#">Delivery Policy</a>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="row mt-5">
            <div className="col-lg-10 mx-auto">
              <h4 className="section-heading">Product Description</h4>
              <p className="description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="related-products-section py-5">
        <div className="container">
          <h3 className="text-center mb-5" style={{ color: "#ffd700" }}>
            You may also like
          </h3>
          <div className="row g-4 justify-content-center">
            {relatedProducts.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-6">
                <div className="related-card text-center">
                  <img src={item.img} alt={item.title} className="related-img" />
                  <p className="related-title">{item.title}</p>
                  <div className="d-flex justify-content-between align-items-center px-3">
                    <span className="related-price">₱{item.price.toFixed(2)}</span>
                    <button className="related-cart-btn">
                      <BsCart3 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper to map color names to actual hex (optional, improves visuals)
const getColorCode = (color) => {
  const map = {
    "Pink Rose": "#ffc1cc",
    Red: "#e74c3c",
    Yellow: "#f1c40f",
    Brown: "#8b4513",
    Blue: "#3498db",
    Green: "#2ecc71",
    Violet: "#9b59b6",
    Lover: "#ff69b4",
  };
  return map[color] || "#ccc";
};

export default ProductDetail;