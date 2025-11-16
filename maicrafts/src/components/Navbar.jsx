import React, { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import './components-css/Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', position: 'left' },
    { name: 'Products', position: 'left' },
    { name: 'About Us', position: 'right' },
    { name: 'Contact', position: 'right' }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-inner">

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-bar">
            <div className="nav-content">

              {/* Left Links */}
              <div className="nav-links">
                {navLinks.filter(l => l.position === 'left').map(link => (
                  <a
                    key={link.name}
                    href={`#${link.name.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setActiveLink(link.name)}
                    className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Center Logo */}
              <div className="logo-wrapper">
                <div className="logo-circle">
                      <div className="logo-text">
               <img src="logo.webp" alt="maicraftslogo" srcset="" />
              </div>
                  
                </div>
              </div>

              {/* Right Links */}
              <div className="nav-links">
                {navLinks.filter(l => l.position === 'right').map(link => (
                  <a
                    key={link.name}
                    href={`#${link.name.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setActiveLink(link.name)}
                    className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mobile-nav">
          <div className="mobile-top">
            <div className="mobile-logo-circle">
              <div className="logo-text">
               <img src="logo.webp" alt="maicraftslogo" srcset="" />
              </div>
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
                <a
                  key={link.name}
                  href={`#${link.name.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsMenuOpen(false);
                  }}
                  className={`dropdown-link ${activeLink === link.name ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

     
    </nav>
  );
};

export default Navbar;
