import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as productService from '../services/productService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  PackageX,
  Trash2,
  Edit3,
  CheckCircle,
  X,
} from 'lucide-react';

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [contactRevealed, setContactRevealed] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Edit Listing Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: '',
    category: 'Books',
    condition: 'Good',
    description: '',
    campus: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await productService.getProductById(id);
        if (res && res.data) {
          setProduct(res.data);
          setEditFormData({
            title: res.data.title || '',
            price: res.data.price || '',
            category: res.data.category || 'Books',
            condition: res.data.condition || 'Good',
            description: res.data.description || '',
            campus: res.data.campus || '',
            imageUrl: res.data.imageUrl || '',
          });
        } else {
          setError('Product listing not found.');
        }
      } catch (err) {
        console.error('Fetch product details error:', err);
        setError(
          err.response?.status === 404
            ? 'Product listing not found or has been removed by the seller.'
            : 'Unable to load product details. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      await productService.deleteProduct(id);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete listing.');
      setDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setUpdating(true);
      const newStatus = product.status === 'available' ? 'sold' : 'available';
      const res = await productService.updateProduct(id, { status: newStatus });
      if (res && res.data) {
        setProduct(res.data);
        setSuccessMessage(`Listing status updated to ${newStatus.toUpperCase()}`);
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.description || editFormData.price === '') {
      alert('Please fill in all required fields.');
      return;
    }

    const numericPrice = parseFloat(editFormData.price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      alert('Price must be a valid positive amount.');
      return;
    }

    try {
      setUpdating(true);
      const res = await productService.updateProduct(id, {
        ...editFormData,
        price: numericPrice,
      });
      if (res && res.data) {
        setProduct(res.data);
        setIsEditModalOpen(false);
        setSuccessMessage('Listing details updated successfully!');
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '4rem auto' }}>
        <PackageX size={48} className="empty-icon" color="#EF4444" />
        <h2 className="empty-title">Product Not Found</h2>
        <p className="empty-text">
          {error || "We couldn't find the product listing you're looking for."}
        </p>
        <Link to="/" className="btn btn-primary" id="back-to-marketplace-btn">
          <ArrowLeft size={16} />
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isOwner =
    currentUser &&
    product?.seller &&
    (currentUser._id === product.seller._id || currentUser._id === product.seller);

  const sellerName = product.seller?.name || 'Fellow Student';
  const sellerEmail = product.seller?.email || 'contact@campuscart.edu';
  const sellerCampus = product.seller?.campus || product.campus;

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Top Action Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" className="btn btn-secondary btn-sm" id="details-back-link">
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        {isOwner && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleToggleStatus}
              className={`btn btn-sm ${product.status === 'available' ? 'btn-secondary' : 'btn-primary'}`}
              disabled={updating}
              id="toggle-status-btn"
              title="Toggle item availability status"
            >
              <CheckCircle size={15} />
              {product.status === 'available' ? 'Mark as Sold' : 'Mark as Available'}
            </button>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="btn btn-secondary btn-sm"
              disabled={updating}
              id="edit-listing-btn"
            >
              <Edit3 size={15} />
              Edit Listing
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
              disabled={deleting}
              id="delete-listing-btn"
            >
              <Trash2 size={15} />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="alert-box alert-success" style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification Banner */}
      {error && product && (
        <div className="alert-box alert-error" style={{ marginBottom: '1.5rem' }}>
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="details-container">
        {/* Product Image */}
        <div className="details-image-box">
          <img
            src={product.imageUrl || fallbackImage}
            alt={product.title}
            className="details-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>

        {/* Product Details & Actions */}
        <div className="details-info">
          <div className="details-badge-row">
            <span className="category-chip active" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
              {product.category}
            </span>
            <span className="category-chip" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', background: '#F1F5F9' }}>
              Condition: <strong>{product.condition}</strong>
            </span>
            <span
              className="category-chip"
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.85rem',
                background: product.status === 'available' ? '#ECFDF5' : '#FEE2E2',
                color: product.status === 'available' ? '#047857' : '#B91C1C',
                borderColor: product.status === 'available' ? '#A7F3D0' : '#FECACA',
              }}
            >
              ● {product.status === 'available' ? 'Available' : 'Sold'}
            </span>
          </div>

          <h1 className="details-title">{product.title}</h1>
          <div className="details-price">{formatPrice(product.price)}</div>

          <div className="details-description-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Seller Information Card */}
          <div className="seller-card">
            <h4>Seller Information</h4>
            <div className="seller-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="#4F46E5" />
                <span>
                  Listed by: <strong>{sellerName}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#4F46E5" />
                <span>Campus: {sellerCampus}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="#4F46E5" />
                <span>Posted on: {formatDate(product.createdAt)}</span>
              </div>
            </div>

            {/* Contact Seller Action Box */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #C7D2FE' }}>
              {contactRevealed ? (
                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #A5B4FC',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} />
                    <span>Seller Contact Details</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem' }}>
                    Connect with {sellerName} directly to arrange item pickup and payment:
                  </p>
                  <a
                    href={`mailto:${sellerEmail}?subject=Inquiry regarding ${product.title} on CampusCart`}
                    className="btn btn-primary btn-sm"
                  >
                    <Mail size={16} />
                    Email Seller: {sellerEmail}
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
                    } else {
                      setContactRevealed(true);
                    }
                  }}
                  className="btn btn-primary btn-block"
                  id="contact-seller-btn"
                >
                  <Mail size={18} />
                  Contact Seller
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span>CampusCart Verified Campus Listing — Safe on-campus meetups recommended.</span>
          </div>
        </div>
      </div>

      {/* Edit Listing Modal (Full CRUD Support) */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Listing Details</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="edit-title" className="form-label">Title *</label>
                  <input
                    id="edit-title"
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-price" className="form-label">Price (INR ₹) *</label>
                    <input
                      id="edit-price"
                      type="number"
                      name="price"
                      min="0"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-category" className="form-label">Category *</label>
                    <select
                      id="edit-category"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="form-select"
                      required
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-condition" className="form-label">Condition *</label>
                    <select
                      id="edit-condition"
                      name="condition"
                      value={editFormData.condition}
                      onChange={handleEditChange}
                      className="form-select"
                      required
                    >
                      {CONDITIONS.map((cond) => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-campus" className="form-label">Campus Location *</label>
                    <input
                      id="edit-campus"
                      type="text"
                      name="campus"
                      value={editFormData.campus}
                      onChange={handleEditChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-imageUrl" className="form-label">Image URL *</label>
                  <input
                    id="edit-imageUrl"
                    type="url"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={handleEditChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description" className="form-label">Description *</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    rows="4"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="form-textarea"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                  id="save-listing-changes-btn"
                >
                  {updating ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
