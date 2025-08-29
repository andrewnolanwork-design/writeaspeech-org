import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>writeaspeech.org</h3>
            <p>Crafting perfect speeches, one word at a time.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/help">Help</Link>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:support@writeaspeech.org">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 writeaspeech.org. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
