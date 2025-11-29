import React, { useState } from "react";
import { BsCart, BsTrash } from "react-icons/bs";
import "../components/components-css/FloatingCart.css";

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10, qty: 1 },
    { id: 2, name: "Item 2", price: 15, qty: 1 },
    { id: 3, name: "Item 3", price: 20, qty: 1 },
  ]);

  const toggleCart = () => setIsOpen(!isOpen);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
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
        <h3>Your Cart</h3>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price}</span>
                </div>
                <div className="item-actions">
                  <span className="item-qty">x{item.qty}</span>
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
          <span className="total-price">${totalPrice}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => alert("Proceed to Checkout")}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default FloatingCart;
