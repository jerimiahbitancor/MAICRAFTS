import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import "../components/components-css/FloatingCart.css"; // make sure path is correct

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Button */}
      <div className="floating-button" onClick={toggleCart}>
        <BsCart className="floating-icon" />
      </div>

      {/* Sliding Cart Panel */}
      <div className={`cart-panel ${isOpen ? "open" : ""}`}>
        <h3>Your Cart</h3>
        <div className="cart-items">
          <p>Item 1 - $10</p>
          <p>Item 2 - $15</p>
          <p>Item 3 - $20</p>
        </div>
        <button
          className="checkout-btn"
          onClick={() => alert("Checkout!")}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default FloatingCart;
