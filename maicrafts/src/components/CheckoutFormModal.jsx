// src/components/CheckoutFormModal.jsx
import React, { useState } from "react";
import { BsX } from "react-icons/bs";
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-form-overlay" onClick={onClose}>
      <div className="checkout-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-modal-header">
          <h2>Customer Information</h2>
          <BsX className="close-form-modal" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "error" : ""}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "error" : ""}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message for Seller (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requests or notes..."
                rows="4"
              />
            </div>

            <div className="order-summary-mini">
              <div className="summary-row">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <strong>₱{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-confirm-order">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutFormModal;