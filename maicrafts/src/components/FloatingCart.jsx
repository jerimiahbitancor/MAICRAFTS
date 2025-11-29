// src/components/FloatingCart.jsx
import React, { useState, useEffect } from "react";
import { BsCart, BsTrash, BsX } from "react-icons/bs";
import "../components/components-css/FloatingCart.css";

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
  }, []);

  // Update localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsOpen(!isOpen);

  const openCheckout = () => {
    setIsCheckoutOpen(true);
    setIsOpen(false);
  };

  const closeCheckout = () => setIsCheckoutOpen(false);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  // FIX: uses your actual field "quantity"
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Floating Button */}
      <div className="floating-button" onClick={toggleCart}>
        <BsCart className="floating-icon" />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

      {/* Sliding Cart Panel */}
      <div className={`cart-panel ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <BsX className="close-cart" onClick={toggleCart} />
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.title} className="item-thumb" />

                <div className="item-info">
                  <span className="item-name">{item.title}</span>
                  <span className="item-price">₱{item.price.toFixed(2)}</span>
                </div>

                <div className="item-actions">
                  <span className="item-qty">×{item.quantity}</span>
                  <BsTrash
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <span className="total-label">Total:</span>
          <span className="total-price">₱{totalPrice.toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={openCheckout}>
          Checkout
        </button>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={closeCheckout}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Summary</h2>
              <BsX className="close-modal" onClick={closeCheckout} />
            </div>

            <div className="modal-items">
              {cartItems.map((item) => (
                <div className="modal-item" key={item.id}>
                  <div className="modal-item-left">
                    <span className="modal-item-name">{item.title}</span>
                    <span className="modal-item-qty">×{item.quantity}</span>
                  </div>
                  <span className="modal-item-price">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-total">
              <span>Total Amount</span>
              <strong>₱{totalPrice.toFixed(2)}</strong>
            </div>

            <div className="modal-actions">
              <button className="btn-continue-shopping" onClick={closeCheckout}>
                Continue Shopping
              </button>
              <button className="btn-proceed-payment">Proceed to Payment</button>
            </div>

            <p className="modal-note">
              You will be redirected to the payment gateway after confirmation.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;
