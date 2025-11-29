import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import "../css/ProductDetail2.css";

const relatedProducts = [
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Name", rating: 5, price: 159 },
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Name", rating: 5, price: 159 },
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Name", rating: 5, price: 159 },
  { img: "https://i.imgur.com/9g0h1i2.jpg", title: "Name", rating: 5, price: 159 },
];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const basePrice = 0.0;
  const totalPrice = basePrice * quantity;

  return (
    <div className="pd-page">
      <div className="pd-container">
        
        {/* Breadcrumb */}
        <div className="pd-breadcrumb">Products &gt; Product Name</div>

        {/* Main Content */}
        <div className="pd-main">
          
          {/* Left */}
          <div className="pd-left">
            <div className="pd-image-wrapper">
              <img
                src="https://i.imgur.com/9g0h1i2.jpg"
                alt="Product"
                className="pd-main-image"
              />
            </div>
          </div>

          {/* Right */}
          <div className="pd-right">
            <h1 className="pd-title">Product Name</h1>
            <h2 className="pd-price">₱ {totalPrice.toFixed(2)}</h2>

            {/* Description */}
            <div className="pd-description-box">
              <h3 className="pd-description-title">Product Description</h3>
              <p className="pd-description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </div>

            {/* Quantity */}
            <div className="pd-quantity-section">
              <label className="pd-label">Quantity</label>

              <div className="pd-quantity-box">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="pd-qty-btn"
                >
                  -
                </button>

                <span className="pd-qty-value">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="pd-qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="pd-total">
              <span className="pd-total-label">
                Total: ₱ {totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="pd-buttons">
              <button className="pd-add-cart">Add to Cart</button>
              <button className="pd-buy">Buy Now</button>
            </div>

            {/* Policy */}
            <div className="pd-policy">
              <a href="#" className="pd-policy-link">Payment Policy</a>
              <span className="pd-dot">•</span>
              <a href="#" className="pd-policy-link">Delivery Policy</a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="pd-related-section">
          <h3 className="pd-related-title">You may also like</h3>

          <div className="pd-related-grid">
            {relatedProducts.map((product, idx) => (
              <div key={idx} className="pd-related-card">
                
                <img src={product.img} className="pd-related-img" />

                <div className="pd-related-info">
                  <p className="pd-related-name">{product.title}</p>

                  <div className="pd-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="pd-star">★</span>
                    ))}
                  </div>

                  <div className="pd-related-footer">
                    <span className="pd-related-price">
                      ₱ {product.price.toFixed(2)}
                    </span>

                    <button className="pd-related-cart-btn">
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
