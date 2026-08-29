import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ShoppingBag size={20} color="#4F46E5" />
            <h3 style={{ margin: 0, color: '#fff' }}>CampusCart</h3>
          </div>
          <p>
            Buy Smart. Sell Easy. Campus Connected. The dedicated student-to-student marketplace for textbooks, electronics, calculators, and college essentials.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Marketplace</Link></li>
            <li><Link to="/sell">Sell an Item</Link></li>
            <li><Link to="/login">Student Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Popular Categories</h4>
          <ul className="footer-links">
            <li><Link to="/?category=Books">Textbooks & Notes</Link></li>
            <li><Link to="/?category=Electronics">Electronics & Laptops</Link></li>
            <li><Link to="/?category=Calculators">Scientific Calculators</Link></li>
            <li><Link to="/?category=Lab Equipment">Lab Equipment</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CampusCart. Built for student communities.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Designed with <Heart size={14} color="#EF4444" fill="#EF4444" /> for university campuses
        </p>
      </div>
    </footer>
  );
};

export default Footer;
