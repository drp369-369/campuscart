import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, PlusCircle, LogOut, LogIn, UserPlus, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu whenever route changes
  React.useEffect(() => {
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

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <div className="nav-logo-icon">
            <ShoppingBag size={20} />
          </div>
          <span>CampusCart</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Browse
          </Link>

          {isAuthenticated ? (
            <>
              <div className="nav-user-badge">
                <User size={15} />
                <span>{currentUser?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <Link to="/sell" className="btn btn-primary btn-sm" onClick={closeMenu}>
                <PlusCircle size={16} />
                Sell an Item
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Log Out"
                id="logout-btn"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="nav-actions">
              <Link to="/login" className="btn btn-secondary btn-sm" id="nav-login-btn" onClick={closeMenu}>
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" id="nav-register-btn" onClick={closeMenu}>
                <UserPlus size={16} />
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
