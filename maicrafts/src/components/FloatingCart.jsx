// src/components/FloatingCart.jsx
import React, { useState } from "react";
import { BsCart, BsTrash, BsX } from "react-icons/bs";
import "../components/components-css/FloatingCart.css";

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // DELETE THIS LINE IF IT EXISTS:
  // const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setIsOpen(!isOpen);
  const openCheckout = () => {
    setIsCheckoutOpen(true);
    setIsOpen(false);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <div className="floating-button" onClick={toggleCart}>
        <BsCart className="floating-icon" />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

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
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₱{item.price.toFixed(2)}</span>
                </div>
                <div className="item-actions">
                  <span className="item-qty">×{item.qty}</span>
                  <BsTrash
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.key)}
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

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={closeCheckout}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Summary</h2>
              <BsX className="close-modal" onClick={closeCheckout} />
            </div>

            <div className="modal-items">
              {cartItems.map((item) => (
                <div className="modal-item" key={item.key}>
                  <div className="modal-item-left">
                    <span className="modal-item-name">{item.name}</span>
                    <span className="modal-item-qty">×{item.qty}</span>
                  </div>
                  <span className="modal-item-price">
                    ₱{(item.price * item.qty).toFixed(2)}
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
              <button className="btn-proceed-payment">
                Proceed to Payment
              </button>
            </div>

            <p className="modal-note">
              You will be redirected to payment gateway after confirmation.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;