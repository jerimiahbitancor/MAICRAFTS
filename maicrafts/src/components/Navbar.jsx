import React, { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import './components-css/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // To track current route

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-inner">

        {/* Desktop */}
        <div className="desktop-nav">
          <div className="nav-bar">
            <div className="nav-content">

              {/* Left Links */}
              <div className="nav-links">
                {navLinks.filter((l, i) => i < 2).map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Center Logo */}
              <div className="logo-wrapper">
                <div className="logo-circle">
                  <img src="../src/assets/maicrafts_logo.svg" alt="maicraftslogo" />
                </div>
              </div>

              {/* Right Links */}
              <div className="nav-links">
                {navLinks.filter((l, i) => i >= 2).map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mobile-nav">
          <div className="mobile-top">
            <div className="mobile-logo-circle">
              <img src="logo.webp" alt="maicraftslogo" />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button"
            >
              {isMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="dropdown">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`dropdown-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
