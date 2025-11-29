// CustomizeFormModal.jsx
import { useState } from "react";
import { X, Plus, Facebook, Instagram, Mail } from "lucide-react";
import "../css/CustomizeFormModal.css";

const CustomizeFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    productType: "",
    customDescription: "",
    sizeScale: "",
    additionalRequests: "",
    contactNumber: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Custom order submitted successfully!");
    setIsOpen(false);
  };

  return (
    <div className="cfm-container">
      <button className="cfm-triggerBtn" onClick={() => setIsOpen(true)}>
        Customize!
      </button>

      {isOpen && (
        <div className="cfm-overlay" onClick={() => setIsOpen(false)}>
          <div className="cfm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cfm-closeBtn" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>

            <div className="cfm-content">
              <h1 className="cfm-title">Custom Order Form</h1>

              <div className="cfm-formContainer">
                
                {/* 1. Product Type */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">1.</span> Select Product Type:
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
                      />
                      <span>Crochet Product</span>
                    </label>
                  </div>
                </div>

                {/* 2. Description */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">2.</span> Describe Your Custom Order:
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
                  />
                </div>

                {/* 3. Upload Image */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">3.</span> Upload Inspiration Image:
                  </label>
                  <p className="cfm-helperText">
                    Attach a sample image or sketch.
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
                  />
                </div>

                {/* 6. Contact */}
                <div className="cfm-section">
                  <label className="cfm-sectionLabel">
                    <span className="cfm-number">6.</span> Contact Information:
                  </label>

                  <div className="cfm-contactInputs">
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Mobile Number"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="cfm-input"
                    />
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
    </div>
  );
};

export default CustomizeFormModal;
