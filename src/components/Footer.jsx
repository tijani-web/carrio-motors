import React from 'react';
import Ticker from './Ticker';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Column - Logo & Tagline */}
        <div className="footer__column footer__column--left">
          <div className="footer__logo">
            <h2 className="footer__logo-text">Carrio Motors</h2>
            <p className="footer__tagline">Driving Excellence Since 2005</p>
          </div>
        </div>

        {/* Center Column - Site Map */}
        <div className="footer__column footer__column--center">
          <nav className="footer__nav">
            <h3 className="footer__nav-title">Site Map</h3>
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a href="#home" className="footer__nav-link">Home</a>
              </li>
              <li className="footer__nav-item">
                <a href="#about" className="footer__nav-link">About Us</a>
              </li>
              <li className="footer__nav-item">
                <a href="#gallery" className="footer__nav-link">Gallery</a>
              </li>
              <li className="footer__nav-item">
                <a href="#contact" className="footer__nav-link">Contact Us</a>
              </li>
              <li className="footer__nav-item">
                <a href="#finance" className="footer__nav-link">Finance</a>
              </li>
              <li className="footer__nav-item">
                <a href="#warranty" className="footer__nav-link">Warranty</a>
              </li>
            
            </ul>
          </nav>
        </div>

        {/* Right Column - Contact Info */}
        <div className="footer__column footer__column--right">
          <div className="footer__contact">
            <h3 className="footer__contact-title">Contact Us</h3>
            <address className="footer__contact-info">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                <a href="mailto:info@carriomotors.com" className="footer__contact-link">
                  info@carriomotors.com
                </a>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+1234567890" className="footer__contact-link">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                123 Automotive Avenue<br />
                Detroit, MI 48201
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright">
        <p>&copy; {currentYear} Carrio Motors. All rights reserved.</p>
      </div>

      {/* Ticker Component */}
      <Ticker />
    </footer>
  );
};

export default Footer;