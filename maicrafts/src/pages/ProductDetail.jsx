// src/pages/ProductDetail.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../css/ProductDetail.css";
import { products } from "../data/productsData";

const ProductDetail = () => {
  const { id } = useParams();

  // Find product
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="text-center mt-5">Product not found.</h2>;
  }

  // Use product thumbnails or fallback
  const thumbnails = product.images || [product.img];

  // States
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const [quantity, setQuantity] = useState(1);
  const [flowerQty, setFlowerQty] = useState("");
  const [size, setSize] = useState("");
  const [addOns, setAddOns] = useState("");

  const getAddOnPrice = () => {
    if (addOns.includes("₱50")) return 50;
    if (addOns.includes("₱250")) return 250;
    if (addOns.includes("₱350")) return 350;
    return 0;
  };
  
  const totalPrice = (product.price + getAddOnPrice()) * quantity;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const uniqueKey =
      size || flowerQty || addOns
        ? `${product.id}-${size}-${flowerQty}-${addOns}`
        : `${product.id}-${Date.now()}`;
  
    const existingItem = cart.find((item) => item.key === uniqueKey);
  
    const finalPrice = product.price + getAddOnPrice();
  
    if (existingItem) {
      existingItem.qty += quantity;
      existingItem.total = finalPrice * existingItem.qty;
    } else {
      cart.push({
        key: uniqueKey,
        id: product.id,
        title: product.title,
        price: finalPrice,
        img: selectedImage,
        qty: quantity,    // ✔ FIXED
        flowerQty,
        size,
        addOns,
        total: finalPrice * quantity,
      });      
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    alert("Added to cart!");
  };
  
  // Related products (3 random)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);                      

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
                <button className="btn-add-cart" onClick={addToCart}>
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
          <p>{product.description}</p>
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