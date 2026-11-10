import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as productService from '../services/productService';
import { PlusCircle, ArrowLeft, Image as ImageIcon, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Books',
  'Electronics',
  'Calculators',
  'Lab Equipment',
  'Furniture',
  'Stationery',
  'Other',
];

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const SUGGESTED_IMAGES = [
  { label: 'Casio Scientific Calculator', url: '/items/casio-fx991ex.jpg' },
  { label: 'TI-84 Graphing Calculator', url: '/items/ti84-plus.jpg' },
  { label: 'Engineering Textbook', url: '/items/engineering-mathematics.jpg' },
  { label: 'Operating Systems Book', url: '/items/operating-system-concepts.png' },
  { label: 'Arduino Uno Kit', url: '/items/arduino-uno-r3.jpg' },
  { label: 'Digital Multimeter', url: '/items/digital-multimeter.jpg' },
  { label: 'Ergonomic Study Chair', url: '/items/mesh-study-chair.jpg' },
  { label: 'Mechanical Keyboard', url: '/items/mechanical-keyboard.jpg' },
  { label: 'White Lab Coat', url: '/items/white-lab-coat.jpg' },
  { label: 'Spiral Notebooks', url: '/items/spiral-notebooks.jpg' },
];

const CreateListing = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Books',
    condition: 'Good',
    campus: currentUser?.campus || '',
    imageUrl: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSelectSuggestedImage = (url) => {
    setFormData({
      ...formData,
      imageUrl: url,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, category, condition, campus, imageUrl } = formData;

    if (!title || !description || price === '' || !campus || !imageUrl) {
      setError('Please fill in all required fields.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      setError('Price must be a valid positive amount.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await productService.createProduct({
        title,
        description,
        price: numericPrice,
        category,
        condition,
        campus,
        imageUrl,
      });

      if (res && res.data && res.data._id) {
        navigate(`/products/${res.data._id}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Create listing error:', err);
      const errMsg =
        err.response?.data?.message ||
        'Something went wrong while creating your listing. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="auth-card" style={{ maxWidth: '100%', padding: '2.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div className="auth-brand-badge">
            <PlusCircle className="auth-brand-icon" size={24} />
          </div>
          <h1 className="auth-title">Sell an Item on CampusCart</h1>
          <p className="auth-subtitle">
            List your textbook, calculator, electronics, or equipment for fellow students.
          </p>
        </div>

        {error && (
          <div className="alert-box alert-error" role="alert">
            <AlertCircle size={18} className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Casio FX-991EX Scientific Calculator"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="condition" className="form-label">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="form-select"
                required
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price in INR (₹) *
              </label>
              <input
                id="price"
                type="number"
                name="price"
                min="0"
                step="1"
                placeholder="e.g. 750"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="campus" className="form-label">
                Campus / Location *
              </label>
              <input
                id="campus"
                type="text"
                name="campus"
                placeholder="e.g. RV University Campus"
                value={formData.campus}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Product Image URL *
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              required
            />
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Quick suggestions (click to use sample photo):
              </span>
              <div className="suggested-image-chips">
                {SUGGESTED_IMAGES.map((img) => {
                  const isSelected = formData.imageUrl === img.url;
                  return (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => handleSelectSuggestedImage(img.url)}
                      className={`suggested-image-chip ${isSelected ? 'active' : ''}`}
                    >
                      <ImageIcon size={13} />
                      {img.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {formData.imageUrl && (
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="form-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                Image Preview:
              </span>
              <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the item's condition, included accessories, edition, and reason for selling..."
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            id="create-listing-submit-btn"
          >
            {loading ? (
              <span className="spinner-inline">Publishing Listing...</span>
            ) : (
              <>
                <PlusCircle size={18} />
                Publish Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
