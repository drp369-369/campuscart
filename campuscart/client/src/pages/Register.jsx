import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowRight, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    campus: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, campus } = formData;

    if (!name || !email || !password || !confirmPassword || !campus) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register({
        name,
        email,
        password,
        confirmPassword,
        campus,
      });
      navigate('/', { replace: true });
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        'Failed to register account. Please check your details and try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-badge">
            <UserPlus className="auth-brand-icon" size={24} />
          </div>
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">
            Join your university community on CampusCart today.
          </p>
        </div>

        {error && (
          <div className="alert-box alert-error" role="alert">
            <AlertCircle size={18} className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Student Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g. rahul@rvu.edu.in"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="campus" className="form-label">
              Campus / College Name *
            </label>
            <input
              id="campus"
              type="text"
              name="campus"
              placeholder="e.g. RV University, Bengaluru"
              value={formData.campus}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password (min 6 chars) *
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            id="register-submit-btn"
          >
            {loading ? (
              <span className="spinner-inline">Creating account...</span>
            ) : (
              <>
                Register Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
