import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, PlusCircle, LogOut, LogIn, UserPlus, User } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">
            <ShoppingBag size={20} />
          </div>
          <span>CampusCart</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/" className="nav-link">
            Browse
          </Link>

          {isAuthenticated ? (
            <>
              <div className="nav-user-badge">
                <User size={15} />
                <span>{currentUser?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <Link to="/sell" className="btn btn-primary btn-sm">
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
              <Link to="/login" className="btn btn-secondary btn-sm" id="nav-login-btn">
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" id="nav-register-btn">
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
