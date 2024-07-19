import React from 'react';
import './Footer.css';

export function Footer()  {
  return (
  <>
    <footer className="footer">
    <hr/>

      <div className="footer-container">
        <div className="footer-section quick-links">
          <h3>Quick links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutus">About us</a></li>
            <li><a href="/signup">Create Account</a></li>
          </ul>
        </div>
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li><a href="/contact-us">Contact us</a></li>
            <li><a href="/our-team">Our team</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div className="footer-section contact-us">
          <h3>Contact-us</h3>
          <ul>
            <li><a href="/how-it-works">How it works?</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="mailto:support@example.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="footer-copyright">
          &copy; Copyright 2024
        </div>
      </div>
    </footer>
    </>
  );
};

