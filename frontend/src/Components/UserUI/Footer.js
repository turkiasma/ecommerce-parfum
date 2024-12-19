import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'; 
import '../../Styles/Footer.css'; // Link to the separate footer CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-company-name">
          <h3>AURA</h3>
        </div>

        <div className="footer-socials">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 AURA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;