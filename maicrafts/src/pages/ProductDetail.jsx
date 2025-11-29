// src/pages/ProductDetail.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../css/ProductDetail.css";

const thumbnails = [
  "https://i.imgur.com/9g0h1i2.jpg",
  "https://i.imgur.com/3j4k5l6.jpg",
  "https://i.imgur.com/7m8n9o0.jpg",
  "https://i.imgur.com/2p3q4r5.jpg",
];

const relatedProducts = [
  { id: 1, img: "https://i.imgur.com/9g0h1i2.jpg", title: "Rainbow Rose Bouquet", price: 799 },
  { id: 2, img: "https://i.imgur.com/3j4k5l6.jpg", title: "Eternal Bloom", price: 599 },
  { id: 3, img: "https://i.imgur.com/7m8n9o0.jpg", title: "Crochet Dragon", price: 249 },
  { id: 4, img: "https://i.imgur.com/2p3q4r5.jpg", title: "24K Rose", price: 1299 },
];

const ProductDetail = () => {
  const { id } = useParams(); // For future dynamic product loading

  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const [quantity, setQuantity] = useState(1);
  const [flowerQty, setFlowerQty] = useState("");
  const [size, setSize] = useState("");
  const [addOns, setAddOns] = useState("");

  // Mock product data (replace with real data later)
  const product = {
    title: "Rainbow Rose Bouquet",
    price: 799.0,
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; {product.title}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left: Images */}
          <div className="image-section">
            <div className="main-image-wrapper">
              <img src={selectedImage} alt="Product" className="main-image" />
            </div>
            <div className="thumbnails">
              {thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImage === thumb ? "active" : ""}`}
                  onClick={() => setSelectedImage(thumb)}
                >
                  <img src={thumb} alt={`View ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="info-section">
            <h1 className="product-title">{product.title}</h1>
            <h2 className="product-price">₱{totalPrice.toFixed(2)}</h2>

            {/* Color Variations */}
            <div className="variation-section">
              <label className="label">Variations</label>
              <div className="color-grid">
                {["Pink Rose", "Red", "Yellow", "Brown", "Blue", "Green", "Violet", "Lover"].map((color) => (
                  <label key={color} className="color-option">
                    <input type="radio" name="color" />
                    <span className={`color-swatch ${color.toLowerCase().replace(" ", "-")}`} />
                    <span className="color-name">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Flower Qty & Size */}
            <div className="row">
              <div className="half">
                <label className="label">Quantity of Flower</label>
                <select value={flowerQty} onChange={(e) => setFlowerQty(e.target.value)} className="select">
                  <option value="">Choose...</option>
                  <option>5 Flowers</option>
                  <option>12 Flowers</option>
                  <option>24 Flowers</option>
                  <option>50 Flowers</option>
                </select>
              </div>
              <div className="half">
                <label className="label">Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)} className="select">
                  <option value="">Choose...</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>

            {/* Add-ons */}
            <div className="section">
              <label className="label">Select your add ons</label>
              <select value={addOns} onChange={(e) => setAddOns(e.target.value)} className="select">
                <option value="">None</option>
                <option>Greeting Card (+₱50)</option>
                <option>Chocolate Box (+₱250)</option>
                <option>Teddy Bear (+₱350)</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="section">
              <label className="label">Quantity</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Total & Buttons */}
            <div className="total-section">
              <div className="total">Total: ₱{totalPrice.toFixed(2)}</div>
              <div className="button-group">
                <button className="btn-add-cart">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button className="btn-buy-now">Buy Now</button>
              </div>
            </div>

            {/* Policy Links */}
            <div className="policy-links">
              <a href="#">Payment Policy</a> • <a href="#">Delivery Policy</a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-section">
          <h3>Product Description</h3>
          <p>
            A stunning preserved rainbow rose bouquet that lasts over a year with no water needed. 
            Perfect gift for anniversaries, birthdays, or just to say "I love you". 
            Handcrafted with love.
          </p>
        </div>

        {/* Related Products */}
        <div className="related-section">
          <h3>You may also like</h3>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="related-card">
                <img src={item.img} alt={item.title} />
                <div className="related-info">
                  <p className="related-title">{item.title}</p>
                  <div className="stars">★★★★★</div>
                  <div className="related-footer">
                    <span className="related-price">₱{item.price}</span>
                    <button className="related-cart-btn">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;