import React from "react";
import "./components-css/Footer.css";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="custom-footer">
      {/* Top Gold Section */}
      <div className="footer-top">
        <h4 className="footer-title">Maicrafts</h4>
        <p className="footer-subtitle">
          Handmade Crafts & Customizable Gifts <br /> ©2025
        </p>
      </div>

      {/* Bottom White Section */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTiktok /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><HiMail /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
