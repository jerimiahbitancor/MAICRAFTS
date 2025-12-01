// src/components/CheckoutFormModal.jsx
import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import "../components/components-css/CheckoutFormModal.css";

const CheckoutFormModal = ({ isOpen, onClose, onSubmit, cartItems, totalPrice }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields correctly.",
        background: "#462c14",
        color: "#fff",
        confirmButtonColor: "#ffbd3a",
      });
      return;
    }

    // Loadinggerger
    Swal.fire({
      title: "Sending Order...",
      text: "Please wait",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: "#462c14",
      color: "#ffbd3a",
      didOpen: () => Swal.showLoading(),
    });

    try {
      await onSubmit(formData); // your backend call

      // SUCCESS — Luxury Alert
      await Swal.fire({
        icon: "success",
        title: `Thank You, ${formData.firstName}!`,
        html: `
          <p style="color:#d4a574; margin:15px 0;">
            Your order has been received successfully!
          </p>
          <p style="color:#aaa; font-size:0.9rem;">
            We'll contact you at <strong>${formData.email}</strong>
          </p>
        `,
        background: "linear-gradient(135deg, #462c14, #5a3818)",
        color: "#fff",
        confirmButtonText: "Done",
        confirmButtonColor: "#ffbd3a",
        customClass: {
          popup: "swal-luxury-popup",
          confirmButton: "swal-gold-btn"
        }
      });

      // Reset & close
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      onClose();

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Something went wrong. Please try again later.",
        background: "#462c14",
        color: "#fff",
        confirmButtonColor: "#ffbd3a",
      });
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);

  if (!isOpen) return null;

  return (
    <div className="checkout-form-overlay" onClick={onClose}>
      <div className="checkout-form-modal" onClick={e => e.stopPropagation()}>
        <div className="form-modal-header">
          <h2>Customer Information</h2>
          <BsX className="close-form-modal" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            {/* Form fields - unchanged */}
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                  className={errors.firstName ? "error" : ""} placeholder="Juan" />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                  className={errors.lastName ? "error" : ""} placeholder="Dela Cruz" />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className={errors.email ? "error" : ""} placeholder="juan@gmail.com" />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group full-width">
              <label>Message (Optional)</label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder="Special requests..." rows="3" />
            </div>

            {/* Order Summary - same as before */}
            <div className="order-summary-section">
              <h3>Your Order ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})</h3>
              <div className="order-items-list">
                {cartItems.map(item => (
                  <div key={item.key} className="order-item-row">
                    <div className="order-item-info">
                      <p className="item-title">{item.title}</p>
                      <p className="item-meta">
                        {item.flowerQty && <span>• {item.flowerQty}</span>}
                        {item.size && <span>• {item.size}</span>}
                        {item.addOns && <span>• {item.addOns}</span>}
                      </p>
                    </div>
                    <div className="order-item-price">
                      <span>{item.qty} × ₱{item.price.toFixed(2)}</span>
                      <strong>₱{(item.price * item.qty).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total-breakdown">
                <div className="summary-row"><span>Subtotal</span><span>₱{totalPrice.toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping Fee</span><span className="text-muted">To be calculated</span></div>
                <div className="summary-row total">
                  <strong>Total Amount</strong>
                  <strong>₱{totalPrice.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-confirm-order">Confirm Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutFormModal;