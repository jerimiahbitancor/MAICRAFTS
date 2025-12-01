// src/pages/CustomizeFormModal.jsx
import { useState } from "react";
import { X, Plus, Facebook, Instagram, Mail } from "lucide-react";
import Swal from "sweetalert2";
import "../css/CustomizeFormModal.css";
import emailjs from "@emailjs/browser";

const CustomizeFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productType: "",
    customDescription: "",
    sizeScale: "",
    additionalRequests: "",
    customerEmail: "",
    shippingAddress: "",
    paymentOption: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "maicrafts");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duilngnnp/image/upload",
        { method: "POST", body: formDataUpload }
      );
      const data = await response.json();
      setUploadedImageUrl(data.secure_url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not upload image. You can still submit without it.",
        background: "#462c14",
        color: "#fff",
        confirmButtonColor: "#ffbd3a",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productType) newErrors.productType = "Please select a product type.";
    if (!formData.customDescription.trim()) newErrors.customDescription = "Description is required.";
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email.";
    }
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required.";
    }
    if (!formData.paymentOption) {
      newErrors.paymentOption = "Please select a payment option.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      productType: "",
      customDescription: "",
      sizeScale: "",
      additionalRequests: "",
      customerEmail: "",
      shippingAddress: "",
      paymentOption: "",
    });
    setUploadedImage(null);
    setUploadedImageUrl(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        background: "#462c14",
        color: "#ffbd3a",
        confirmButtonColor: "#ffbd3a",
      });
      return;
    }

    // Show loading
    Swal.fire({
      title: "Submitting your custom order...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: "#462c14",
      color: "#ffbd3a",
    });

    const templateParams = {
      productType: formData.productType,
      customDescription: formData.customDescription,
      sizeScale: formData.sizeScale || "Not specified",
      additionalRequests: formData.additionalRequests || "None",
      customerEmail: formData.customerEmail,
      shippingAddress: formData.shippingAddress,
      paymentOption: formData.paymentOption,
      uploadedImage: uploadedImageUrl
        ? `<img src="${uploadedImageUrl}" alt="Reference" style="max-width: 100%; border-radius: 12px; margin: 10px 0;" />`
        : "No image uploaded",
    };

    try {
      await emailjs.send(
        "service_qxu1bhv",
        "template_qy8mwbr",
        templateParams,
        "s9m7Qu_NeupEAwhmQ"
      );

      await Swal.fire({
        icon: "success",
        title: "Thank You!",
        html: `
          <p style="color:#d4a574;">Your custom order has been submitted!</p>
          <p style="color:#aaa; font-size:0.9rem;">We'll contact you soon at<br><strong>${formData.customerEmail}</strong></p>
        `,
        background: "linear-gradient(135deg, #462c14, #5a3818)",
        color: "#fff",
        confirmButtonColor: "#ffbd3a",
        customClass: { popup: "swal-luxury-popup", confirmButton: "swal-gold-btn" },
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "We received your order, but email failed. Please message us on Facebook/Instagram!",
        background: "#462c14",
        color: "#fff",
        confirmButtonColor: "#ffbd3a",
      });
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cfm-overlay" onClick={onClose}>
      <div className="cfm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cfm-closeBtn" onClick={onClose}>
          <X size={28} />
        </button>

        <div className="cfm-content">
          <h1 className="cfm-title">Custom Order Form</h1>

          <div className="cfm-formContainer">
            {/* Product Type */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">1.</span> Select Product Type: <span style={{ color: "red" }}>*</span>
              </label>
              <div className="cfm-checkboxGroup">
                {["Flower Bouquet", "Crochet Product"].map((type) => (
                  <label key={type} className="cfm-checkboxLabel">
                    <input
                      type="radio"
                      name="productType"
                      value={type}
                      checked={formData.productType === type}
                      onChange={handleInputChange}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {errors.productType && <p className="cfm-error">{errors.productType}</p>}
            </div>

            {/* Description */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">2.</span> Describe Your Custom Order: <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="customDescription"
                value={formData.customDescription}
                onChange={handleInputChange}
                className="cfm-textarea"
                rows={5}
                placeholder="Colors, style, theme, materials, etc."
              />
              {errors.customDescription && <p className="cfm-error">{errors.customDescription}</p>}
            </div>

            {/* Image Upload */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">3.</span> Upload Reference Image:
              </label>
              <div className="cfm-uploadArea">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cfm-fileInput"
                  id="cfm-upload"
                  disabled={isUploading}
                />
                <label htmlFor="cfm-upload" className="cfm-uploadLabel">
                  {isUploading ? (
                    <div>Uploading...</div>
                  ) : uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="cfm-previewImage" />
                  ) : (
                    <div className="cfm-uploadPlaceholder">
                      <Plus size={40} />
                      <span>Click to upload</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Size */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">4.</span> Size (Optional):
              </label>
              <input
                type="text"
                name="sizeScale"
                value={formData.sizeScale}
                onChange={handleInputChange}
                className="cfm-input"
                placeholder="e.g. 12 inches, 50cm tall"
              />
            </div>

            {/* Additional */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">5.</span> Additional Requests:
              </label>
              <input
                type="text"
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleInputChange}
                className="cfm-input"
                placeholder="e.g. gift wrapping, delivery date"
              />
            </div>

            {/* Shipping Address */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">6.</span> Shipping Address: <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                className="cfm-textarea"
                rows={3}
                placeholder="House/Unit No., Street, Barangay, City, Province, ZIP Code"
              />
              {errors.shippingAddress && <p className="cfm-error">{errors.shippingAddress}</p>}
            </div>

            {/* Payment Option */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">7.</span> Payment Option: <span style={{ color: "red" }}>*</span>
              </label>
              <div className="cfm-checkboxGroup">
                {["Cash on Delivery (COD)", "GCash"].map((payment) => (
                  <label key={payment} className="cfm-checkboxLabel">
                    <input
                      type="radio"
                      name="paymentOption"
                      value={payment}
                      checked={formData.paymentOption === payment}
                      onChange={handleInputChange}
                    />
                    <span>{payment}</span>
                  </label>
                ))}
              </div>
              {errors.paymentOption && <p className="cfm-error">{errors.paymentOption}</p>}
            </div>

            {/* Contact */}
            <div className="cfm-section">
              <label className="cfm-sectionLabel">
                <span className="cfm-number">8.</span> Your Email: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="cfm-input"
                placeholder="you@example.com"
              />
              {errors.customerEmail && <p className="cfm-error">{errors.customerEmail}</p>}
            </div>

            {/* Social Links */}
            <div className="cfm-socialLinks">
              <div className="cfm-socialItem">
                <Facebook size={20} /> <span>maicrafts.ph</span>
              </div>
              <div className="cfm-socialItem">
                <Instagram size={20} /> <span>maicrafts_ph_</span>
              </div>
              <div className="cfm-socialItem">
                <Mail size={20} /> <span>maicrafts_.ph@gmail.com</span>
              </div>
            </div>

            <button onClick={handleSubmit} className="cfm-submitBtn" disabled={isUploading}>
              {isUploading ? "Uploading Image..." : "SUBMIT CUSTOM ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeFormModal;