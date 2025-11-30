// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop";
import FloatingCart from "./components/FloatingCart.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductDetail2 from "./pages/ProductDetail2.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeFormModal from "./pages/CustomizeFormModal.jsx";

// Wrapper component to access location inside Router
const AppContent = () => {
  const [cart, setCart] = useState([]);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const location = useLocation();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const updateCart = () => {
      const updated = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(updated);
    };
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  // Auto-open Customize Modal when URL has ?customize=true
  useEffect(() => {
    if (location.search === "?customize=true") {
      setIsCustomizeOpen(true);
    }
  }, [location]);

  const removeItem = (key) => {
    const newCart = cart.filter((item) => item.key !== key);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const closeCustomizeModal = () => {
    setIsCustomizeOpen(false);
    // Clean URL without reloading
    window.history.replaceState({}, "", window.location.pathname);
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Floating Cart */}
      <FloatingCart cartItems={cart} removeItem={removeItem} />

      {/* All your pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/crochet/:id" element={<ProductDetail2 />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      {/* This is the magic: Modal opens on top of everything */}
      <CustomizeFormModal
        isOpen={isCustomizeOpen}
        onClose={closeCustomizeModal}
      />
    </>
  );
};

// Main App with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;