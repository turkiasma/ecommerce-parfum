// Footer.js
import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'; // Import icons
import '../App'; // You can style the footer in a separate CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-company-name">
          <h3>AURA</h3>
        </div>
        <div className="footer-socials">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
