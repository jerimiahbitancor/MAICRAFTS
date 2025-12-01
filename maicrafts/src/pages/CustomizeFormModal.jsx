// CustomizeFormModal.jsx
import { useState } from "react";
import { X, Plus, Facebook, Instagram, Mail } from "lucide-react";
import "../css/CustomizeFormModal.css";
import emailjs from '@emailjs/browser';
// Remove Cloudinary import if not using signed uploads (unsigned doesn't need it)
// import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config (optional for unsigned uploads; remove if not needed)
// cloudinary.config({
//   cloud_name: 'duilngnnp',
//   api_key: '483396165557549',
//   // Remove api_secret for unsigned uploads (security risk to expose it)
// });

const CustomizeFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productType: "",
    customDescription: "",
    sizeScale: "",
    additionalRequests: "",
    customerEmail: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the image locally
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);

      // Upload to Cloudinary and get URL
      const formDataUpload = new FormData();  // Renamed to avoid conflict
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'maicrafts');  // Your preset name 

      fetch(`https://api.cloudinary.com/v1_1/duilngnnp/image/upload`, {  // Replaced YOUR_CLOUD_NAME
        method: 'POST',
        body: formDataUpload,
      })
      .then(response => response.json())
      .then(data => {
        setUploadedImageUrl(data.secure_url);  // Store the URL
      })
      .catch(error => console.error('Upload failed:', error));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productType) {
      newErrors.productType = "Please select a product type.";
    }
    if (!formData.customDescription.trim()) {
      newErrors.customDescription = "Please describe your custom order.";
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
      newErrors.customerEmail = "Please enter a valid email address.";
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
    });
    setUploadedImage(null);
    setUploadedImageUrl(null);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const templateParams = {
        productType: formData.productType,
        customDescription: formData.customDescription,
        sizeScale: formData.sizeScale || "Not specified",
        additionalRequests: formData.additionalRequests || "None",
        customerEmail: formData.customerEmail,
        uploadedImage: uploadedImageUrl ? `<img src="${uploadedImageUrl}" alt="Uploaded Inspiration Image" style="max-width: 300px; height: auto;" />` : "No image uploaded.",
      };

      // Send email using EmailJS
      emailjs.send(
        'service_qxu1bhv',
        'template_qy8mwbr',
        templateParams,
        's9m7Qu_NeupEAwhmQ'
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert("Custom order submitted successfully! A confirmation email has been sent to your email.");
        resetForm();
        onClose();
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        alert("Submission successful, but email failed to send. Please contact us directly.");
        resetForm();
        onClose();
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="cfm-overlay" onClick={onClose}>
          <div className="cfm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cfm-closeBtn" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="cfm-content">
              <h1 className="cfm-title">Custom Order Form</h1>

              <div className="cfm-formContainer">
                
                {/* 1. Product Type */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">1.</span> Select Product Type: <span style={{ color: 'red' }}>*</span>
                  </label>

                  <div className="cfm-checkboxGroup">
                    <label className="cfm-checkboxLabel">
                      <input
                        type="radio"
                        name="productType"
                        value="Flower Bouquet"
                        checked={formData.productType === "Flower Bouquet"}
                        onChange={handleInputChange}
                        className="cfm-radio"
                        required
                      />
                      <span>Flower Bouquet</span>
                    </label>

                    <label className="cfm-checkboxLabel">
                      <input
                        type="radio"
                        name="productType"
                        value="Crochet Product"
                        checked={formData.productType === "Crochet Product"}
                        onChange={handleInputChange}
                        className="cfm-radio"
                        required
                      />
                      <span>Crochet Product</span>
                    </label>
                  </div>
                  {errors.productType && <p style={{ color: 'red', fontSize: '14px' }}>{errors.productType}</p>}
                </div>

                {/* 2. Description */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">2.</span> Describe Your Custom Order: <span style={{ color: 'red' }}>*</span>
                  </label>
                  <p className="cfm-helperText">
                    Include details such as colors, materials, or design ideas.
                  </p>
                  <textarea
                    name="customDescription"
                    value={formData.customDescription}
                    onChange={handleInputChange}
                    className="cfm-textarea"
                    rows={4}
                    placeholder="Describe your custom order here (e.g., colors, materials, design ideas)."
                    required
                  />
                  {errors.customDescription && <p style={{ color: 'red', fontSize: '14px' }}>{errors.customDescription}</p>}
                </div>

                {/* 3. Upload Image */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">3.</span> Upload Inspiration Image:
                  </label>
                  <p className="cfm-helperText">
                    Attach a sample image or sketch (optional).
                  </p>

                  <div className="cfm-uploadArea">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cfm-fileInput"
                      id="imageUpload"
                    />

                    <label htmlFor="imageUpload" className="cfm-uploadLabel">
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Preview" className="cfm-previewImage" />
                      ) : (
                        <div className="cfm-uploadPlaceholder">
                          <Plus size={40} />
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* 4. Size Scale */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">4.</span> Size Scale:
                  </label>
                  <input
                    type="text"
                    name="sizeScale"
                    value={formData.sizeScale}
                    onChange={handleInputChange}
                    className="cfm-input"
                    placeholder="e.g.,120x120inches"
                  />
                </div>

                {/* 5. Additional Requests */}
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
                    placeholder="Any special instructions or notes?"
                  />
                </div>

                {/* 6. Contact */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">6.</span> Contact Information: <span style={{ color: 'red' }}>*</span>
                  </label>

                  <div className="cfm-contactInputs">
                    <input
                      type="email"
                      name="customerEmail"
                      placeholder="Email Address (e.g., example@gmail.com)"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="cfm-input"
                      required
                    />
                    {errors.customerEmail && <p style={{ color: 'red', fontSize: '14px' }}>{errors.customerEmail}</p>}
                  </div>

                  <div className="cfm-socialLinks">
                    <div className="cfm-socialItem">
                      <Facebook size={20} className="cfm-socialIcon" />
                      <span>maicrafts.ph</span>
                    </div>

                    <div className="cfm-socialItem">
                      <Instagram size={20} className="cfm-socialIcon" />
                      <span>maicrafts_ph_</span>
                    </div>

                    <div className="cfm-socialItem">
                      <Mail size={20} className="cfm-socialIcon" />
                      <span>maicrafts_.ph@gmail.com</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleSubmit} className="cfm-submitBtn">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomizeFormModal;