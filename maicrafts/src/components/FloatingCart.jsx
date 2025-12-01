// src/components/FloatingCart.jsx
import React, { useState, useEffect } from "react";
import { BsCart, BsTrash, BsX, BsPlus, BsDash } from "react-icons/bs";
import CheckoutFormModal from "./CheckoutFormModal";
import "../components/components-css/FloatingCart.css";

const FloatingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load cart from localStorage on mount + listen for updates
  useEffect(() => {
    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(saved);
    };

    loadCart();
    window.addEventListener("cart-updated", loadCart);

    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const toggleCart = () => setIsOpen(!isOpen);

  const openCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setIsCheckoutOpen(true);
    setIsOpen(false);
  };

  const closeCheckout = () => setIsCheckoutOpen(false);

  const handleProceedToPayment = () => {
    setIsCheckoutOpen(false);
    setIsFormOpen(true);
  };

  // REAL updateQuantity – updates localStorage + state
  const updateQuantity = (itemKey, newQty) => {
    if (newQty < 1) return;

    const updatedCart = cartItems.map(item =>
      item.key === itemKey ? { ...item, qty: newQty } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // REAL removeItem – removes from localStorage + state
  const removeItem = (itemKey) => {
    const updatedCart = cartItems.filter(item => item.key !== itemKey);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleQuantityChange = (itemKey, change) => {
    const item = cartItems.find(i => i.key === itemKey);
    if (!item) return;

    const newQty = item.qty + change;
    if (newQty < 1) return;

    updateQuantity(itemKey, newQty);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cartItems: cartItems.map(item => ({
            name: item.title,
            quantity: item.qty,
            price: item.price,
          })),
          totalPrice: totalPrice
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Thank you ${formData.firstName}! Your order has been received.`);
        // Optional: clear cart after successful order
        localStorage.removeItem("cart");
        setCartItems([]);
        setIsFormOpen(false);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Error sending order email.");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button className="floating-cart-button" onClick={toggleCart} aria-label="Open Cart">
        <BsCart className="floating-cart-icon" />
        {totalItems > 0 && (
          <span className="floating-cart-badge">{totalItems}</span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-sidebar-header">
          <div className="cart-sidebar-title">
            <BsCart className="cart-title-icon" />
            <h3>Shopping Cart</h3>
            <span className="cart-items-count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          </div>
          <button className="cart-close-btn" onClick={toggleCart} aria-label="Close Cart">
            <BsX />
          </button>
        </div>

        <div className="cart-sidebar-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <BsCart />
              </div>
              <h4>Your cart is empty</h4>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item-card" key={item.key}>
                  <div className="cart-item-image">
                    <img src={item.img || '/placeholder.png'} alt={item.title} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.title}</h4>
                    <p className="cart-item-price">₱{item.price.toFixed(2)}</p>
                    
                    {/* Show variations if any */}
                    {item.flowerQty && <p><small>Flower Qty: {item.flowerQty}</small></p>}
                    {item.size && <p><small>Size: {item.size}</small></p>}
                    {item.addOns && <p><small>Add-on: {item.addOns}</small></p>}

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn qty-btn-minus"
                          onClick={() => handleQuantityChange(item.key, -1)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <BsDash />
                        </button>
                        <span className="qty-display">{item.qty}</span>
                        <button 
                          className="qty-btn qty-btn-plus"
                          onClick={() => handleQuantityChange(item.key, +1)}
                          aria-label="Increase quantity"
                        >
                          <BsPlus />
                        </button>
                      </div>
                      
                      <button
                        className="cart-item-remove"
                        onClick={() => removeItem(item.key)}
                        aria-label="Remove item"
                      >
                        <BsTrash />
                      </button>
                    </div>
                    
                    <div className="cart-item-subtotal">
                      Subtotal: <strong>₱{(item.price * item.qty).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total-section">
              <div className="cart-subtotal">
                <span>Subtotal:</span>
                <span>₱{totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-shipping">
                <span>Shipping:</span>
                <span className="shipping-note">Calculated at checkout</span>
              </div>
              <div className="cart-total">
                <span>Total:</span>
                <strong>₱{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            
            <button className="cart-checkout-btn" onClick={openCheckout}>
              Proceed to Checkout
            </button>
            
            <button className="cart-continue-btn" onClick={toggleCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && <div className="cart-backdrop" onClick={toggleCart}></div>}

      {/* Checkout Summary Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={closeCheckout}>
          <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <h2>Order Summary</h2>
              <button className="checkout-modal-close" onClick={closeCheckout}><BsX /></button>
            </div>

            <div className="checkout-modal-body">
              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div className="checkout-item" key={item.key}>
                    <div className="checkout-item-image">
                      <img src={item.img || '/placeholder.png'} alt={item.title} />
                    </div>
                    <div className="checkout-item-info">
                      <h4>{item.title}</h4>
                      <p className="checkout-item-qty">Quantity: {item.qty}</p>
                      {item.flowerQty && <p><small>{item.flowerQty}</small></p>}
                      {item.size && <p><small>Size: {item.size}</small></p>}
                      {item.addOns && <p><small>{item.addOns}</small></p>}
                      <p className="checkout-item-price">₱{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="checkout-item-total">
                      ₱{(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary">
                <div className="checkout-summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₱{totalPrice.toFixed(2)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>Shipping Fee</span>
                  <span className="text-muted">To be calculated</span>
                </div>
                <div className="checkout-summary-total">
                  <span>Total Amount</span>
                  <strong>₱{totalPrice.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className="checkout-modal-footer">
              <button className="btn-secondary" onClick={closeCheckout}>Back to Cart</button>
              <button className="btn-primary" onClick={handleProceedToPayment}>
                Continue to Payment
              </button>
            </div>

            <p className="checkout-note">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      )}

      <CheckoutFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default FloatingCart;