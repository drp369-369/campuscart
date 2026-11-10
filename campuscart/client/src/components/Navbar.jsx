import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, PlusCircle, LogOut, LogIn, UserPlus, User, Menu, X, Compass, Home } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleBrowseClick = (e) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      const elem = document.getElementById('browse-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#browse-section');
      setTimeout(() => {
        const elem = document.getElementById('browse-section');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand" onClick={handleHomeClick}>
          <div className="nav-logo-icon">
            <ShoppingBag size={20} />
          </div>
          <span>CampusCart</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            type="button"
            className={`nav-link-btn ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <button
            type="button"
            className="nav-link-btn"
            onClick={handleBrowseClick}
          >
            <Compass size={16} />
            <span>Browse</span>
          </button>

          <Link
            to="/sell"
            className={`btn btn-primary btn-sm ${location.pathname === '/sell' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <PlusCircle size={16} />
            <span>Sell an Item</span>
          </Link>

          {isAuthenticated ? (
            <div className="nav-user-group">
              <div className="nav-user-badge">
                <User size={15} />
                <span>{currentUser?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Log Out"
                id="logout-btn"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="nav-actions">
              <Link
                to="/login"
                className={`btn btn-secondary btn-sm ${location.pathname === '/login' ? 'active' : ''}`}
                id="nav-login-btn"
                onClick={closeMenu}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className={`btn btn-secondary btn-sm ${location.pathname === '/register' ? 'active' : ''}`}
                id="nav-register-btn"
                onClick={closeMenu}
              >
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
